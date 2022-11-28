const _ = require('lodash');
const Contenedor = require("../data/contenedor");
const products = new Contenedor();

// const getProducts = (_req, res)=> {
//     let products = data.getAll()
//     res.status(200).render(
//         'index',
//         {products}
//     )
// }

const getProductsById = async (req, res, next)=>{
    const {id} = req.params;
    if(_.isNil(id)){
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }
    try{
        const data = await products.getProduct(id);
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
}

const addNewProduct = async (req, res, next)=>{
    const  { body } = req;
    if(_.isNil(body)){
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }
    try{
        const data = await products.createProduct(body);
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
}

module.exports = {
    // getProducts,
    getProductsById,
    addNewProduct
}