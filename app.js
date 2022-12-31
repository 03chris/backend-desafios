require('dotenv').config()
const logger = require("morgan");
const express = require('express')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(logger("dev"));

const router = require('./src/routes/index')
const errorHandler = require('./src/middlewares/errorHandler')

app.set('views', './src/views')
app.set('view engine', 'pug')

app.get('/', (_req, res) =>{ 
    res.json({
        message: 'Hello World!'
    })
})

app.use('/api', router)
app.use(errorHandler)

module.exports = app