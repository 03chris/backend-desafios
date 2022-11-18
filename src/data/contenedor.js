const fs = require(`fs`);

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
        this.id = 1
        fs.writeFileSync(`./${ruta}`, `[]`)
    }

    save(obj){
        try {
            let data = fs.readFileSync(`${this.ruta}`, "utf-8")
            data = JSON.parse(data)
            obj = { 
                ...obj,
                id: this.id++
            }
            data.push(obj)
            fs.writeFileSync(`${this.ruta}`, JSON.stringify(data));
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

    deleteById(id){
        try {
            let data = fs.readFileSync(this.ruta, "utf-8")
            data = JSON.parse(data)
            let product = data.find(e => e.id == id)
            if(product){
                data = data.filter(e => e.id != id)
                data = JSON.stringify(data)
                fs.writeFileSync(this.ruta, data)
                return data
            } else {
                return null
            }            
        }catch(err){
            console.log(`Error ${err}`)
        }
    }

    editProductById(id, title, price){
        console.log(title);
        console.log(price);
        let data = this.getAll()
        data.forEach(e=>{
            if(e.id == id){
                e.title = title
                e.price = price
            }
        })
        fs.writeFileSync(this.ruta, JSON.stringify(data))
        this.save(JSON.stringify(data))
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

const data = new Contenedor("./utils/data.txt")

// function test(){
//     data.save({title: "obj1", price: 100, photo: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'})
//     data.save({title: "obj2", price: 300, photo: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'})
//     data.save({title: "obj3", price: 500, photo: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'})
//     data.getAll()
//     data.getById(1)
//     data.deleteById(3)
//     data.deleteAll()
// }

// test()

module.exports = data