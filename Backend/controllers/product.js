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


exports.create = async (req,res) => {
    try {
        
        let data = req.body
        //console.log(data)
        let product = new Product(data)
        const result = await product.save().catch(e => {
            console.log("ERROR : ",e)
            process.exit(1)
        });
        return res.json(result)
    } catch (error) {
        return res.status(400).json("ERROR : ",error.stack)
    }
}


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
    let sortBy = req.body.sortBy ? req.body.sortBy : "created_at";
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

        // var matchAndQuery= []

        let date1 = new Date(Date.parse("1970-01-01T00:00:00.000Z"))
        let date2 = new Date(Date.now());

        let stockQuery = {"stock" : { '$in': [ true, false] } }
        let orBrandQuery = {"$or" : [ { 'brand.name': { '$regex': '.*', '$options': 'i' } } ]}
        let orDateQuery = {"$or" : [ { "created_at": { '$gte': date1, '$lte': date2 } } ]}
        let andDiscountQuery = {"$and" : [ { "discount": { '$gte': 0 } } ]}

        for (let key in req.body.filters) {

            if (req.body.filters[key].length>0) {
                console.log(key)
                if (key === "discount") {
                    let expr = []
                    for (let index in req.body.filters[key]) {
                        console.log(req.body.filters[key])
                        let discountQ = {}
                        let discount_object = {}
                        let operator = req.body.filters[key][index][0]
                        let discount_value = parseFloat(req.body.filters[key][index][1])
                        if(operator==="greater_than"){
                            discountQ["$gt"] = discount_value
                        }else if(operator==="smaller_than"){
                            discountQ["$lt"] = discount_value
                        }else{
                            discountQ["$eq"] = discount_value
                        }
                        
                        discount_object["discount"] = discountQ
                        //discountQ['created_at'] = dateQ
                        expr.push(discount_object)
                    }
                    andDiscountQuery["$and"] = expr
                    //matchAndQuery.push(orDateQuery)

                }
                else if (key === "brand") {
                    let regExpr = []
                    for (let index in req.body.filters[key]) {
                        let brand = {}
                        let brand_name = {}
                        brand["$regex"] = ".*" + req.body.filters[key][index] + ".*"
                        brand["$options"] = "i"
                        brand_name['brand.name'] = brand
                        regExpr.push(brand_name)
                    }
                    orBrandQuery["$or"] = regExpr
                    //matchAndQuery.push(orBrandQuery)
                }
                else if (key === "stock") {
                    let inStockQuery = {}
                    inStockQuery["$in"] = req.body.filters[key]
                    stockQuery["stock"] = inStockQuery
                    //matchAndQuery.push(stockQuery)
                    
                }
                else if(key === "created_at") {
                    let expr = []
                    for (let index in req.body.filters[key]) {
                        let dateQ = {}
                        let created_at = {}
                        let date1 = new Date(Date.parse(req.body.filters[key][index][0]+"T00:00:00.000Z"))
                        let date2 = new Date(Date.parse(req.body.filters[key][index][1]+"T23:59:59.000Z"))
                        dateQ["$gte"] = date1
                        dateQ["$lte"] = date2
                        created_at['created_at'] = dateQ
                        expr.push(created_at)
                    }
                    orDateQuery["$or"] = expr
                    //matchAndQuery.push(orDateQuery)
                }
            }
        }
            console.log(findArgs)
            //console.log(findArgs['brand.name'])
            try {
                console.log(orBrandQuery["$or"])
                console.log(orDateQuery["$or"])
                console.log(andDiscountQuery["$and"])
                console.log(stockQuery["stock"])
                let products = await Product.aggregate([
                    {$project : { name:1, price:1, media:1, brand:1, 
                        description_text:1, stock:1, created_at:1, discount: { $multiply: [ {  $divide: [ { 
                            $subtract: [ "$price.regular_price.value", "$price.offer_price.value" ] }, "$price.regular_price.value" ] 
                        }, 100 ]} } },
                    {
                        $match : {
                            "$and":
                            [
                                {"$or": orBrandQuery["$or"] },
                                { "stock.available" : stockQuery["stock"] },
                                {"$or": orDateQuery["$or"] },
                                {"$and": andDiscountQuery["$and"] }
                            //     { "discount" : { "$eq" : 30 } }
                                
                            ]
                         }
                   

                    },
                    // { "$sort": sortBy },
                    { "$skip": skip },
                    { "$limit": limit }
                    
                    
                ])

                console.log(products.length)
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

