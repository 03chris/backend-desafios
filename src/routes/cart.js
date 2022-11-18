const router = require('express').Router()

router.get('/', (_req, res)=>{
    res.status(200).render('cart', {
        message: 'This is the cart'
    })
})

module.exports = router