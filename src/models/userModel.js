const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

UserSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

UserSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('user', UserSchema)