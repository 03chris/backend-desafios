const router = require('express').Router()
const isAuthenticated = require('../../middlewares/isAuthenticated')

router.get('/', (_req, res)=>{
    res.render('welcome')
})

router.get('/cart', (_req, res)=>{
    res.render('cart')
})

router.get('/home', isAuthenticated, (req, res)=>{
    res.render('home')
})

router.get('/signup', (_req, res)=>{
    res.render('signup')
})

router.get('/login', (_req, res)=>{
    res.render('login')
})

module.exports = router