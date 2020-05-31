const ndjson = require('ndjson')
const fs = require('fs')
var json2mongo = require('json2mongo');

const Product = require('../models/product')

// Product Controllers

exports.importData = async (req, res) => {
    try {
        console.log("========== Started Parsing ==========")
        var inputStream = fs.createReadStream('data.json');
        var transformStream = inputStream.pipe( ndjson.parse() );
        transformStream
        .on(
            "data",
            async function(data) {
                let product = new Product(json2mongo(data))
                const res = await product.save().catch(e => {
                    console.log("ERROR : ",e)
                    process.exit(1)
                });
            }
        )
    
        // Once ndjson has parsed all the input, let's indicate done.
        .on(
            "end",
            function() {
                return res.send("Parsing Done")
            }
        )
        .on('error', function(err) {
            console.log(err.stack);
         });

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
};


exports.list = async (req,res) => {
    try {
        let order = req.query.order ? req.query.order : 'asc';
        let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
        let limit = req.query.limit ? parseInt(req.query.limit) : 6;

        let products = await Product.find()
        .select('name price media brand description_text stock created_at _id')
        .sort([[sortBy, order]])
        .limit(limit)
        res.json(products)
        
    } catch (error) {
        return res.status(400).json({"msg" : "Products Not Found!!!"})
    }
}



// exports.filterData = async (req, res) => {
//     try {

//         let body = req.body
//         if (!body){
//             let products = await Product.find()
//             return res.send(products)
//         }
//         else{
            
//         }

//         return res.send("Done")
        
//     } catch (error) {
//         console.log(error.stack)
//     }
// }


exports.listBySearch = async (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    //console.log(order, sortBy, limit, skip, req.body.filters);
    //console.log("findArgs", findArgs);
 
    if(req.body.filters===0){
        try {
            let products = await Product.find()
            .select('name price media brand description_text stock created_at _id')
            .sort([[sortBy, order]])
            .limit(limit)
            res.json({
                size: products.length,
                products
            });
            
        } catch (error) {
            return res.status(400).json({"msg" : "Products Not Found!!!"})
        }  
    }
    else{
        for (let key in req.body.filters) {
            //console.log(req.body.filters[key])

            if (req.body.filters[key].value != null && req.body.filters[key].value.length>0) {
                if (key === "discount") {
                    if(req.body.filters[key].operator=="greater_than"){
                        findArgs[key] = { $gte: req.body.filters[key].value }
                    }   
                    else if(req.body.filters[key].operator=="smaller_than"){
                        findArgs[key] = { $lte: req.body.filters[key].value }
                    }
                    else{
                        findArgs[key] = { $eq: req.body.filters[key].value }
                    }
                }
                else if (key === "brand") {
                    v = { $regex: new RegExp(req.body.filters[key].value.toLowerCase(), "i") };
                    key = key + ".name"
                    findArgs[key] = v
                    
                }
                else if (key === "stock") {
                    v = req.body.filters[key].value
                    key = key + ".available"
                    findArgs[key] = v
                }
                else if(key === "created_at") {
                        findArgs[key] = {
                            $gte: req.body.filters[key][0],
                            $lte: req.body.filters[key][1]
                        };
                    }
                }
            }

        // MyModel.find({ $or:[ {'isPrivate':"false"}, {'isPrivate':false} ]})

    //     var thename = 'Andrew';
    //     db.collection.find({'name': {'$regex': thename,$options:'i'}});
    //    If you want to query on 'case-insensitive exact matchcing' then you can go like this.
    
    //    var thename =  '^Andrew$';
    //    db.collection.find({'name': {'$regex': thename,$options:'i'}});
            
            console.log(findArgs)
            try {
                let products = await Product.find(findArgs)
                .select('name price media brand description_text stock created_at _id')
                .sort([[sortBy, order]])
                .skip(skip)
                .limit(limit)
                res.json({
                    size: products.length,
                    products
                });
                //console.log(products)
            } catch (error) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
        }
};

