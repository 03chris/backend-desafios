const products = require('./products/containerProducts.js')

const getProducts = async (req, res) => {
  const {id} = req.params
  if(!id){
    res.send(await products.getProductsDB())
  }
}

const getProductsById = async (req, res) =>{
  const id = req.params.id
  const product = await products.getByIdDB(id)
  if(product){
    res.json(product)
  }else{
    res.status(404).json({ 
      message: "Producto no encontrado" 
    })
  }
}

const addProduct = (req, res) => {
  const product = req.body
  products.saveDB(product)
  res.status(201).json({ message: "Producto agregado!" })
}

const updateProduct = async (req, res) => {
  const id = req.params.id
  if(!id){
    return res.status(400).send({ 
      message: "Producto no encontrado" 
    }) 
  }
  await products.updateProductDB(id, req.body)
  res.json({ message: "Producto actualizado" })
}

const deleteProductById = async (req, res) => {
  const {id} = req.params
  try{
      let product = await products.deleteProductDB(id)
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