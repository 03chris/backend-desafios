require('dotenv').config()
const logger = require("morgan");
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongooseConnect = require('./src/config/connect')
const passport = require('passport')
const flash = require('connect-flash')

const {getStoreConfig} = require('./src/config/config')

const app = express()
require('./src/middlewares/local-auth')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongooseConnect()
app.use(express.static('views'));
app.use(logger("dev"));

app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{
        httpOnly: false,
        secure: false
    }
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

const router = require('./src/routes/index')
const pagesRoutes = require('./src/routes/pages/pagesRoutes')

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use((req, res, next)=>{
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.loginMessage = req.flash('loginMessage')
    app.locals.user = req.user
    next()
})

app.use('/', router)
app.use(pagesRoutes)

module.exports = app