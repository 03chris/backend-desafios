const socket = io()

function sendMessage(){
    const name = document.querySelector('#name').value;
    console.log(name)
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