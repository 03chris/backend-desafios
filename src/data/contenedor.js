const knexConfig = require('../../db/config');
const knexDb = require('knex');
const { v4: uuidv4 } = require('uuid');

class Contenedor{
    constructor(){
        this.knexConfig = knexConfig;
    }

    async createProduct(product){
        const knex = knexDb(this.knexConfig);
        Object.assign(product, {
            code: uuidv4()
        })
        return new Promise((res, rej) => {
            knex('products').insert(product).then(() => {
                res({
                    success: true,
                    data: product
                });
            }).catch(err => {
                rej(err)
            }).finally(() =>{
                knex.destroy();
            });
        })
    }

    async getProduct(id){
        const knex = knexDb(this.knexConfig);
        try{
            const data = await knex('products').where('code', '=', id).select('*');
            if(data.length == 0){
                return {
                    success: true,
                    message: 'Product not found'
                }
            }
            const proudctFormatted = JSON.parse(JSON.stringify(data[0]));
            knex.destroy();
            return {
                success: true,
                data: proudctFormatted
            }
        }catch(err){
            console.error(err);
            knex.destroy();
            return {
                success: false,
                message: err.message
            }
        }
    }

}

module.exports = Contenedor;