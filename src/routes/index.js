const router = require('express').Router()

const products = require('./products')
const cart = require('./cart')

const passport = require('passport')

const sendSms = require('../utils/functions')


router.use('/products', products)
router.use('/cart', cart)

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/home',
  failureRedirect: '/signup',
  passReqToCallback: true
}))

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/login',
  passReqToCallback: true
}))

router.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if(err){ 
      return next(err) 
    }
    res.redirect("/")
  });
});

router.post('/checkout', async (_req, res) =>{
  await sendSms({
    body: 'Gracias por tu compra!'
  });

  return res.status(200).json({message: 'Mensaje enviado!'});
})

module.exports = router