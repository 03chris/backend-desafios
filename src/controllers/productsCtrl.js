const data = require('../data/contenedor')

const getProducts = (_req, res)=>{ 
    if(admin){
        let products = data.getAll()
        res.status(200).render(
            'index',
            {products}
        )
    }else{
        res.status(404).render('error404', {
            message: 'You are not admin. Sorry'
        });
    }
}

const getProductsById = (req, res, next)=>{
    try {
        let products = data.getAll()
        const {id} = req.params
        const idProduct = products.find(e => e.id == id)
        idProduct 
            ? res.status(200).render(
                'productDetail',
                {idProduct}
            )
            : res.status(404).json({error: 'product not found'})
    }catch(err){
        next(err)
    }
}

const editProduct = (req, res)=>{
    const {id} = req.params
    const {title, description, price} = req.body
    
    let products = data.getAll()
    const idProduct = products.find(e => e.id == id)
    if(idProduct){
        data.editProductById(id, title, description, price)
        return res.status(200).json({
            producto: {title, description, price}
        })
    }
    return res.status(404).json({error: 'product not found'})
}

const addNewProduct = (req, res, next)=>{
    const body = req.body
    try {
        data.save(body)
        res.status(200).json(body)
    }catch(err){
        next(err)
    }
}

const deleteProductById = (req, res, next)=>{
    const {id} = req.params
    try{
        let product = data.deleteById(id)
        product ? res.status(200).json({response: 'deleted'}) : res.status(404).json({response: 'not found'})
    }catch(err){
        next(err)
    }
}

module.exports = {
    getProducts,
    getProductsById,
    editProduct,
    addNewProduct,
    deleteProductById
}