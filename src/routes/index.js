const router = require('express').Router()
const UserSchema = require('../models/userModel')

router.post('/login', async (req, res)=>{
    const { username } = req.body
    const findUser = await UserSchema.findOne({username})
    if(findUser){
        return res.status(403).json({
            err: 'El nombre que ingresaste ya existe'
        })
    }
    const newUser = new UserSchema({
        username
    })
    const addUser = await newUser.save()
    if(!addUser){
        console.log('ERROR')
    }
    req.session.username = username
    req.session.isAuth = true
    res.redirect('/')
})

router.get('/exit', (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.error(err)
            process.exit()
        }
    })
    res.redirect('/login')
})

module.exports = router