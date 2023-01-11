const mongoose = require('mongoose')
const {getMongoConfig} = require('../config/config')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'

const mongooseConnect = () => {
    mongoose.set("strictQuery", false)
    mongoose.connect(MONGO_URI, getMongoConfig())
    .then(()=>console.info('Mongoose Connected'))
    .catch(err =>{
        console.error(err)
        process.exit()
    })
}

module.exports = mongooseConnect