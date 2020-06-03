const express = require('express')
const router = express.Router()

const { list, importData, listBySearch, create }  = require('../controllers/product')



// @route       GET api/products
// @desc        LIST ALL PRODUCTS
// @access      Public

router.get('/products', list);


// @route       POST api/products
// @desc        ADD NEW PRODUCT
// @access      Public

router.post('/products', create);


// @route       GET api/products/import
// @desc        Upload Data to DB
// @access      Public

router.get('/products/import', importData);


// @route       POST api/products/by/search
// @desc        FILTER PRODUCTS
// @access      Public

router.post("/products/by/search", listBySearch);


module.exports = router