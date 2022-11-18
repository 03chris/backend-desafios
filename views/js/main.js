const button = document.querySelector('#add')

function addNewProduct(){
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const photo = document.querySelector('#photo').value
    if(!title || !price || !photo){
        alert('Faltan datos');
        return
    }
    const newProduct = {
        title,
        price,
        photo,
        timestamp: new Date().toUTCString(),
        codigo: Math.floor(Math.random() * 100)
    }
    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#photo').value = '';

    const URL = 'http://localhost:3000/api/products'

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(data=>data.json())
    .then(json=>console.log(json))
    .catch(err=>console.log(err))
}