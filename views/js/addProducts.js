// const button = document.querySelector('#add')

// button.addEventListener('click', e=>{
//     e.preventDefault()

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
// })