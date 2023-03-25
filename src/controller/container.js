const fs = require('fs')

class Container {
  constructor(ruta){
    this.ruta = ruta;
    this.objects = this.readData();
  }

  generateId(){
    try{
      if(this.objects.length === 0){
        return 1
      }
      return this.objects[this.objects.length - 1].id + 1
    }catch(err){
      console.log(`Error: ${err}`)
    }
  }

  save(obj){
    try{
      obj.id = this.generateId()
      obj.timestamp = new Date().toUTCString()
      obj.code = Math.floor(Math.random() * 100)
      this.objects.push(obj)
      this.writeData()
      return obj.id
    }catch(err){
      console.log(`Error: ${err}`)
    }
  }
  
  getAll(){
    try{
      return this.objects
    }catch{
      return []
    }
  }

  getById(id){
    try{
      const obj = this.objects.find(e => e.id === id)
      return obj ? obj : null;
    }catch(err){
      console.log('product not found')
    }
  }

  update(id, data){
    const objToUpdate = this.getById(id)
    const indexObj = this.objects.findIndex(obj => obj.id === objToUpdate.id)
    this.objects[indexObj] = { ...this.objects[indexObj], ...data }
    this.writeData()
  }

  deleteById(id){
    try {
      let data = this.readData()
      let product = data.find(e => e.id == id)
      if(product){
          data = data.filter(e => e.id != id)
          data = JSON.stringify(data)
          fs.writeFileSync(this.ruta, data)
          return data
      }else{
          return null
      }            
  }catch(err){
      console.log(`Error ${err}`)
  }
}

  async deleteAll(){
    try{
      this.objects = []
      this.writeData()
      console.log("Se han borrado todos los items")
    }catch(err){
      console.log(`Error: ${err}`)
    }
  }

  readData(){
    try{
      return JSON.parse(fs.readFileSync(this.ruta, "utf-8"))
    }catch(err){
      console.log(`Error: ${err}`)
      return []
    }
  }

  async writeData(){
    await fs.promises.writeFile(
      this.ruta,
      JSON.stringify(this.objects)
    )
  }
}

module.exports = Container;