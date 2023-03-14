const router = require('express').Router()
const UserSchema = require('../models/userModel')

const passport = require('passport')

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


module.exports = router