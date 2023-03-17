const router = require('express').Router()
const isAuthenticated = require('../../middlewares/isAuthenticated')

router.get('/', (_req, res)=>{
    res.render('welcome')
})

router.get('/home', isAuthenticated, (_req, res)=>{
    res.render('home')
})

router.get('/signup', (_req, res)=>{
    res.render('signup')
})

router.get('/login', (_req, res)=>{
    res.render('login')
})

router.get('/cart', isAuthenticated, (_req, res)=>{
    res.render('cart')
})

router.get('/checkout', isAuthenticated, (_req, res)=>{
    res.render('checkout')
})

module.exports = router