require('dotenv').config()
const logger = require("morgan");
const express = require('express')
const mongoConnect = require('./src/config/index')

const app = express()
mongoConnect()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

const router = require('./src/routes/index')
const errorHandler = require('./src/middlewares/errorHandler')

// app.set('views', './views')
// app.set('view engine', 'pug')

app.get('/', (_req, res) =>{ 
    res.json({
        message: 'Hello World!'
    })
})

app.use('/api', router)
app.use(errorHandler)

module.exports = app