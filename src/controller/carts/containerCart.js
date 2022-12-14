const cartSchema = require('../../models/cartSchema.js')

class cartDB{
    async saveCartDB(){
        try {  
            let newCart = {
                timestamp: new Date().toUTCString(),
                products: [],
            }

            const cart = new cartSchema(newCart)
            await cart.save()
        }catch(err){
            throw new Error(err.message)
        }
    }

    async getCartByIdDB(id){
        try {
            const cart = await cartSchema.findById(id)
            return cart
        }catch(err){
            throw new Error(err.message)
        }
    }

    async addProduct(id, obj){
        try {
            await cartSchema.updateOne(
                { _id: id },
                { $push: {products:  obj }}
            )
        }catch(err){
            throw new Error(err.message)
        }
    }

    async deleteCartDB(id){
        try {
            const cartDelected = await cartSchema.findByIdAndRemove(id)
            return cartDelected.acknowledged
        }catch(err){
            throw new Error(err.message)
        }
    }
}

const carts = new cartDB()

module.exports = carts