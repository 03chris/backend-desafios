require('dotenv').config()
const logger = require("morgan");
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
const mongooseConnect = require('./src/config/connect')

const {getStoreConfig} = require('./src/config/config')

const app = express()

const COOKIE_SECRET = process.env.COOKIE_SECRET || 'undefined'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongooseConnect()
app.use(cookieParser(COOKIE_SECRET))
app.use(express.static('views'));
app.use(logger("dev"));

app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{
        httpOnly: false,
        secure: false
    }
}))

const router = require('./src/routes/index')
const pagesRoutes = require('./src/routes/pages/pagesRoutes')

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use('/', router)
app.use(pagesRoutes)

module.exports = app