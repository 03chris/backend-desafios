const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.headers['x-access-token']
  if(!token){
    return res.status(401).json({
      message: 'Error with token'
    })
  }
  const decode = jwt.verify(token, process.env.COOKIE_SECRET)
  req.userId = decode.id
  next()
}

module.exports = auth;
