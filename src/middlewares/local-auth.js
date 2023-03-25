const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const UserSchema = require('../models/userModel')

passport.serializeUser((user, done)=>{
  done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
  const user = await UserSchema.findById(id)
  done(null, user)
})

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  const user = await UserSchema.findOne({email: email})
  if(user){
    return done(null, false, req.flash('signupMessage', 'The email is register'))
  }else{
    const newUser = new UserSchema()
    newUser.username = req.body.username
    newUser.email = email
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    done(null, newUser)
  }
})) 

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await UserSchema.findOne({email:email})
  
  if(!user){
    return done(null, false, req.flash('loginMessage', 'User not found'))
  }
  if(!user.validatePassword(password)){
    return done(null, false, req.flash('loginMessage', 'Incorrect Password')) 
  }
  done(null, user)
}))