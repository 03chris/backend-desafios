const router = require('express').Router()

const {productsCtrl} = require('../controller/productsCtrl')
const chatCtrl = require('../controller/chatCtrl')

router.use('/products-test', productsCtrl)
router.use('/chat', chatCtrl)

module.exports = router