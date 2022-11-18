const router = require('express').Router()

const{
    getProducts,
    getProductsById,
    editProduct,
    addNewProduct,
    deleteProductById
} = require('../controllers/productsCtrl')


router.get('/', getProducts)
router.get('/:id', getProductsById)
router.put('/:id', editProduct)
router.post('/', addNewProduct)
router.delete('/:id', deleteProductById)  

module.exports = router