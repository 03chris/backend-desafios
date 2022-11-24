const Container = require("./container")

const products = new Container("./db/products.json")

const getProducts = (req, res) => {
  const {id} = req.params
  if(!id){
    res.send(products.getAll())
  }
}

const getProductsById = (req, res) =>{
  const id = Number(req.params.id)
  const product = products.getById(id)
  if(product){
    res.json(product)
  }else{
    res.status(404).json({ 
      message: "Producto no encontrado" 
    })
  }
}

const addProduct = (req, res) => {
  const { name, description, photo, price, stock } = req.body
  products.save({ name, description, photo, price, stock })
  res.status(201).json({ message: "Producto agregado!" })
}

const updateProduct = (req, res) => {
  const id = Number(req.params.id)
  if(id < 0 || id > products.objects.length || isNaN(id)){
    return res.status(400).send({ 
      message: "Producto no encontrado" 
    }) 
  }
  products.update(id, req.body)
  res.json({ message: "Producto actualizado" })
}

const deleteProductById = (req, res) => {
  const {id} = req.params
  try{
      let product = products.deleteById(id)
      product 
          ? res.status(200).json({
              response: `Producto con el id: ${id} eliminado`
          }) 
          : res.status(404).json({response: 'Producto no encontrado'})
  }catch(err){
      console.log(`Error ${err}`)
  }
}

module.exports = {
  products,
  getProducts,
  getProductsById,
  addProduct,
  updateProduct,
  deleteProductById,
}