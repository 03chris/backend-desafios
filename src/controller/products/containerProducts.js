const productSchema = require('../../models/productsSchema')

class ProductsDB{
    constructor(){
        this.allProducts = []
        this.product = {}
    }

    async getProductsDB(){
        try{
            this.allProducts = await productSchema.find()
            return this.allProducts
        }catch(err){
            throw new Error(err.message)
        }
    }

    async getByIdDB(id){
        try {
            this.product = await productSchema.findById(id)
            return this.product
        }catch(err){
            throw new Error(err.message)
        }
    }

    async saveDB(obj){
        try {
            obj.timestamp = new Date().toUTCString()            
            obj.code = Math.floor(Math.random() * 100)

            const product = new productSchema(obj)
            await product.save()
        }catch(err){
            throw new Error(err.message)
        }
    }

    async updateProductDB(id, obj){
        try {
            await productSchema.findByIdAndUpdate(id, obj)
        }catch(err){
            throw new Error(err.message)
        }
    }

    async deleteProductDB(id){
        try {
            const productDelected = await productSchema.deleteOne({_id: id})
            return productDelected.acknowledged
        }catch(err){
            throw new Error(err.message)
        }
    }
}

const products = new ProductsDB()

module.exports = products