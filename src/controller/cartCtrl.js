const { v4: uuid } = require('uuid');
const carts = require('./carts/containerCart.js');

const addCart = async (_req, res) => {
    await carts.saveCartDB();
    res.status(200).json({
        message: 'Carrito creado'
    });
};

const deleteCart = (req, res) => {
    const {id} = req.params
    try{
        let cart = carts.deleteCartDB(id)
        cart 
            ? res.status(200).json({
                response: `Carrito con el id: ${id} eliminado`
            }) 
            : res.status(404).json({response: 'Carrito no encontrado'})
    }catch(err){
        console.log(`Error ${err}`)
    }
};

const getProducts = async (req, res) => {
    const id = req.params.id
    const cart = await carts.getCartByIdDB(id)
    if(cart){
      res.status(200).json(cart.products)
    }else{
      res.status(404).json({ 
        message: "Carrito no encontrado" 
      })
    }
};

const addProductToCart = async (req, res) => {
    const {id} = req.params
    req.body.id = uuid()
    req.body.timestamp = new Date().toUTCString()
    req.body.code = Math.floor(Math.random() * 100)
    await carts.addProduct(id, req.body)
    res.status(201).json({
        message: "El producto fue agregado con exito"
    });
};


module.exports = {
  addCart,
  deleteCart,
  getProducts,
  addProductToCart
};