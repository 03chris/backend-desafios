const Contenedor = require('./src/contenedor')

const data = new Contenedor("./utils/data.txt")

function test() {
   data.save({title: "obj1", price: 100})
   data.save({title: "obj2", price: 300})
   data.save({title: "obj3", price: 500})
   // data.getAll()
   // data.getById(1)
   // data.deleteById(3)
   // data.deleteAll()
 }

 test()

module.exports = data