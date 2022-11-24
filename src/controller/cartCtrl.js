const { v4: uuid } = require('uuid');
const fs = require('fs')
const Container = require("./container");
const carts = new Container("./db/cart.json");
const data = require('../../db/cart.json')

const addCart = (_req, res) => {
    carts.save({ products: [] });
    res.status(200).json({
        message: 'Carrito creado'
    });
};

const deleteCart = (req, res) => {
    const {id} = req.params
    try{
        let cart = carts.deleteById(id)
        cart 
            ? res.status(200).json({
                response: `Carrito con el id: ${id} eliminado`
            }) 
            : res.status(404).json({response: 'Carrito no encontrado'})
    }catch(err){
        console.log(`Error ${err}`)
    }
};

const getProducts = (req, res) => {
    const id = Number(req.params.id)
    const cart = carts.getById(id)
    if(cart){
      res.status(200).json(cart.products)
    }else{
      res.status(404).json({ 
        message: "Carrito no encontrado" 
      })
    }
};

const addProductToCart = (req, res) => {
    const id = Number(req.params.id)
    const cartSelected = carts.getById(id)
    if(cartSelected){
        req.body.id = uuid()
        req.body.timestamp = new Date().toUTCString()
        req.body.code = Math.floor(Math.random() * 100)
        cartSelected.products.push(req.body)
        carts.writeData()
        res.status(201).json({
            message: "El producto fue agregado con exito"
        });
    }else{
        res.status(404).json({ 
            message: "No se encontro el carrito" 
        })
    }
};

const deleteProduct = (req, res) => {
    const id = Number(req.params.id)
    const cart = carts.getById(id)
    if(cart){
        const {id_prod} = req.params
        const productSelected = cart.products.find(e => e.id == id_prod)
        if(productSelected){
            cart.products = cart.products.filter(e => e.id != id_prod)
            carts.deleteById(cart.products.id)
            carts.writeData()
            res.status(200).json({
                message: "El producto fue eliminado con exito"
            });    
        }
        return res.status(404).json({ 
            message: "Este producto no se encuentra en el carrito" 
        })
    }
    return res.status(404).json({ 
        message: "Carrito no encontrado" 
    })
};

module.exports = {
  addCart,
  deleteCart,
  getProducts,
  addProductToCart,
  deleteProduct,
};