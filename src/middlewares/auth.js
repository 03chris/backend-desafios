const auth = (req, res, next) => {
  if(req.session.username && req.session.isAuth){ 
    next()
  }
  res.status(403).json({
    err: 'Tiene que iniciar sesion!'
  })
}

module.exports = auth;
