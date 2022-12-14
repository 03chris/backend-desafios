const admin = (_req, _res, next) => {
    const admin = true; //Cambiar a true para las pruebas
    if (!admin){
      throw new Error("Unauthorize", 401)
    } 
    next()
  }

module.exports = admin