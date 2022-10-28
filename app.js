require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

const router = require('./src/routes/index')
app.use('/api', router)

app.use('/public', express.static(__dirname + '/public'))

app.get('/', (_req, res) =>{ 
    res.json({message: 'Hello World'})
})

module.exports = app
