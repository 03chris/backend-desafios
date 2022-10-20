const fs = require(`fs`);

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
        this.id = 1
        fs.writeFileSync(`./${ruta}`, `[]`)
    }

    save(obj) {
        try {
            let data = fs.readFileSync(`${this.ruta}`, "utf-8")
            data = JSON.parse(data)
            obj = { 
                ...obj,
                id: this.id++
            }
            data.push(obj)
            data = JSON.stringify(data)
            fs.writeFileSync(`${this.ruta}`, data);
        } catch (err) {
            console.log(`Error ${err}`)
        }
    }

    getById(id){
        try {
            let data = fs.readFileSync(`./${this.ruta}`, 'utf-8')
            data = JSON.parse(data)
            let idProduct = data.find(e => e.id === id)
            if(idProduct){
                console.log(`El ID pertenece al objeto: ${idProduct.title}`)
                return idProduct
            }else{
                console.log(`El ID no pertenece a ningun objeto`)
                return null
            }
        }catch(err){
            console.log(`Error: ${err}`);
        }
    }

    getAll(){
        try{
            let data = fs.readFileSync(`${this.ruta}`, "utf-8")
            data = JSON.parse(data)
            return data
        }catch (err){
            console.log(`Error: ${err}`)
        }
    }

    deleteById(id) {
        try{
            let data = fs.readFileSync(`./${this.ruta}`, 'utf-8')
            data = JSON.parse(data)
            let filtrado = data.filter(e => e.id !== id)
            fs.writeFileSync(`${this.ruta}`, JSON.stringify(filtrado))
            console.log(`Objeto con id: ${id} borrado`)
        }catch(err){
            console.log(`Error ${err}`)
        }
    }

    deleteAll() {
        try {
            fs.writeFileSync(`./${this.ruta}`, ``)
            console.log("Se han borrado todos los items")
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }
}

module.exports = Contenedor