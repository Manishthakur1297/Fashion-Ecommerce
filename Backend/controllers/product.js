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

exports.listBySearch = async (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    console.log(order, sortBy, limit, skip, req.body.filters);
 
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

            if (req.body.filters[key].length>0) {
                if (key === "discount") {
                    // if(req.body.filters[key].operator=="greater_than"){
                    //     findArgs[key] = { $gte: req.body.filters[key].value }
                    // }   
                    // else if(req.body.filters[key].operator=="smaller_than"){
                    //     findArgs[key] = { $lte: req.body.filters[key].value }
                    // }
                    // else{
                    //     findArgs[key] = { $eq: req.body.filters[key].value }
                    // }

                    // findArgs['$where'] = 10
                    

                }
                else if (key === "brand") {
                    let regExpr = []
                    let brandFilter = {}
                    for (let index in req.body.filters[key]) {
                        regExpr.push(new RegExp(req.body.filters[key][index].toLowerCase(), "i"))
                    }

                    brandFilter["$in"] = regExpr

                    key = key + ".name"
                    findArgs[key] = brandFilter
                    
                }
                else if (key === "stock") {
                    v = req.body.filters[key]
                    key = key + ".available"
                    findArgs[key] = v
                    console.log(v)
                }
                else if(key === "created_at") {
                        findArgs[key] = {
                            $gte: req.body.filters[key][0],
                            $lte: req.body.filters[key][1]
                        };
                    }
                }
            }
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
                
            } catch (error) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
        }
};

