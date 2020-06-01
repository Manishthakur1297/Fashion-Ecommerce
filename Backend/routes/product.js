const express = require('express')
const router = express.Router()

const { list, importData, listBySearch, create }  = require('../controllers/product')


//Routes Defined

router.get('/products', list);

router.post('/products', create);

router.get('/products/import', importData);

// router.post('/products/filter', filterData)

router.post("/products/by/search", listBySearch);

module.exports = router