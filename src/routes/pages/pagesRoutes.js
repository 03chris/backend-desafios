const router = require('express').Router()
const auth = require('../../middlewares/auth')

router.get('/login', (req, res)=>{
    if(req.session.isAuth){
        res.redirect('/')
    }
    res.render('login')
})

router.get('/', auth, (_req, res)=>{
    res.render('home')
})

module.exports = router