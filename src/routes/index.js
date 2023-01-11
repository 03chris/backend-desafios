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
    req.session.destroy(err => {
        if (err)
          return res.status(500).json({
            success: false,
            message: err.message
          });
          
          
        res.clearCookie('username')
        res.status(200).json({
          success: true,
          message: 'OK'
        })
      });
})

module.exports = router