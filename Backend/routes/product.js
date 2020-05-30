const express = require('express')
const router = express.Router()

const { list, importData, filterData, listBySearch }  = require('../controllers/product')


//Routes Defined

router.get('/products', list);

router.get('/products/import', importData);

router.post('/products/filter', filterData)

router.post("/products/by/search", listBySearch);

module.exports = router