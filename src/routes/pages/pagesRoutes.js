const router = require('express').Router()

router.get('/signup', (req, res)=>{
    if(req.session.isAuth){
        res.redirect('/')
    }
    res.render('signup')
})

router.get('/exit', (_req, res)=>{
    res.render('exit')
})

module.exports = router