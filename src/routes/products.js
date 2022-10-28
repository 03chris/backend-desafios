const router = require('express').Router()

const data = require('../contenedor')

router.get('/', (_req, res) =>{ 
    try{
        let products = data.getAll()
        res.status(200).json(products)
    }catch(err){
        console.log(`Error ${err}`)
    }
})

router.get('/:id', (req, res) => {
    try {
        let products = data.getAll()
        const {id} = req.params
        const idProduct = products.find(e => e.id == id)
        idProduct ? res.status(200).json(idProduct) : res.status(404).json({error: 'product not found'})
    } catch(err) {
        console.log(`Error ${err}`)
    }
})

router.put('/:id', (req, res)=>{
    const {id} = req.params
    const {title, price} = req.body
    
    let products = data.getAll()
    const idProduct = products.find(e => e.id == id)
    if(idProduct){
        data.editProductById(id, title, price)
        return res.status(200).json({
            message: `Producto con id ${id} actualizado`, 
            producto: {title, price}
        })
    }
    return res.status(404).json({error: 'product not found'})
})

router.post('/', (req, res) => {
    const body = req.body
    try {
        data.save(body)
        res.status(200).json(body)
    }catch(err) {
        console.log(`Error ${err}`)
    }
})

router.delete('/:id', (req, res)=>{
    const {id} = req.params
    try{
        let product = data.deleteById(id)
        product ? res.status(200).json({response: 'deleted'}) : res.status(404).json({response: 'not found'})
    }catch(err) {
        console.log(`Error ${err}`)
    }
})  

module.exports = router