const router = require('express').Router()
const auth = require('../../middlewares/auth')

router.get('/login', (req, res)=>{
    if(req.session.isAuth){
        res.redirect('/')
    }
    res.render('login')
})

router.get('/', auth, (req, res)=>{
    res.render('home', {
        username: req.session.username
    })
})

router.get('/exit', (_req, res)=>{
    res.render('exit')
})

module.exports = router