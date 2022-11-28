const router = require('express').Router()

const{
    // getProducts,
    getProductsById,
    addNewProduct
} = require('../controllers/productsCtrl')


// router.get('/', getProducts)
router.get('/:id', getProductsById)
router.post('/', addNewProduct)

module.exports = router