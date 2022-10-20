const express = require('express')
const app = express()

let data = require('./index')

app.set('port', process.env.PORT || 8080)

app.get('/', (_req, res) =>{ 
    res.json({message: 'Hello World'})
})

app.get('/productos', (_req, res) =>{ 
    try{
        let products = data.getAll()
        res.status(200).json(products)
    }catch(err){
        console.log(`Error ${err}`)
    }
})

app.get('/randomProducts', (_req, res) => {
    try {
        let products = data.getAll()
        const randomProduct = products[Math.floor(Math.random() * products.length)]
        res.status(200).json(randomProduct)
    } catch(error) {
        console.log(error)
    }
})

app.listen(app.get('port'), ()=>{
    console.log('Server run')
})
