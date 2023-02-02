const router = require('express').Router()
const UserSchema = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { fork } = require("child_process");

const auth = require('../middlewares/auth')

router.post('/signup', async (req, res)=>{
  try{
    const { username, email, password } = req.body
    const findUser = await UserSchema.findOne({username})
    if(findUser){
        return res.status(403).json({
            err: 'El nombre que ingresaste ya existe'
        })
    }
    const newUser = new UserSchema({
        username,
        email,
        password
    })
    newUser.password = await newUser.encryptPassword(newUser.password)
    const addUser = await newUser.save()

    const token = jwt.sign({id: newUser._id}, process.env.COOKIE_SECRET, {
      expiresIn: 60 * 10
    })

    if(!addUser ){
        console.log('ERROR')
    }
    
    res.json({
      message: 'Te registraste con exito',
      token
    })
  }catch(err){
    console.log('ERROR')
  }
})

router.get('/', auth, async (req, res) =>{
  try{
    const user = await UserSchema.findById(req.userId, {_id: 0, email:0, password: 0, __v: 0})
    if(!user){
      return res.status(404).json({
        message: 'user not found'
      })
    }
    res.json(user)
  }catch(err){
    console.log('ERROR')
  }
})

router.post('/login', async (req, res)=>{
  try {
    const {email, password} = req.body
    const user = await UserSchema.findOne({email: email})
    if(!user){
      return res.status(404).json({
        message: "The email doesn't exist"
      })
    }
    const validPassword = await user.validatePassword(password)
    if(!validPassword){
      return res.status(401).json({
        message: 'Error al loguearte',
        token: null
      })
    }
    const token = jwt.sign({id: user._id}, process.env.COOKIE_SECRET,{
      expiresIn: 60 * 10
    })  
  
    res.json({
      message: 'Logueado',
      token
    })
  }catch(err){
    console.log('ERROR')
  }
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

router.get('/info', (_req, res)=>{
  const info = [{
    argv: process.argv,
    platform: process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage().rss,
    routeEjec: process.execPath,
    pid: process.pid,
    dir: process.cwd()
  }]
  res.json({
    info: info
  })
})

router.get('/random', (req, res) => {
	const forked = fork('src/utils/getRandom.js');

	let { cantidad } = req.query;
	let obj = {};
	cantidad
		? forked.send({ cantidad, obj })
		: forked.send({ cantidad: 500000000, obj });
	forked.on('message', msg => res.json(msg));
});

module.exports = router