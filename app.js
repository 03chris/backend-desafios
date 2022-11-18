require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

global.admin = true

const router = require('./src/routes/index')
const errorHandler = require('./src/middlewares/errorHandler')

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (_req, res) =>{ 
    res.render('home')
})

app.use('/api', router)
app.use(errorHandler)

module.exports = app
