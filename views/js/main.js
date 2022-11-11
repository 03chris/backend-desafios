const socket = io()
// const products = require('./src/data/contenedor')

// function addNewProduct(){
//     const title = document.querySelector('#title').value
//     const price = document.querySelector('#price').value
//     const photo = document.querySelector('#photo').value
//     if(!title || !price || !photo){
//         alert('Faltan datos');
//         return
//     }
//     const newProduct = {
//         title,
//         price,
//         photo
//     }
//     socket.emit('ADD_PRODUCT', newProduct)
//     document.querySelector('#title').value = '';
//     document.querySelector('#price').value = '';
//     document.querySelector('#photo').value = '';

//     const URL = 'http://localhost:8080/api/products'

//     fetch(URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newProduct)
//     })
//     .then(data=>data.json())
//     .then(json=>console.log(json))
//     .catch(err=>console.log(err))
// }

function sendMessage(){
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    if(!message || !name){
        alert('Faltan datos');
        return
    }
    const messageObject = {
        name,
        message
    }
    socket.emit('NEW_MESSAGE', messageObject);
    document.querySelector('#message').value = '';
}

function updateMessage(data){
    let messageLi = ''
    data.forEach(e=>{
        messageLi = messageLi + `<p><b>${e.name}:</b> <i>${e.message}</i></p>`
    })
    document.querySelector('#messagesList').innerHTML = messageLi
}

socket.on('UPDATE_DATA', (data)=>{
    messages = data
    updateMessage(data)
})

socket.on('NEW_MESSAGE_FROM_SERVER', (data) => {
    messages.push(data)
    updateMessage(messages)
});