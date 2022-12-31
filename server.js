const app = require('./app')
const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');

const http = new HttpServer(app)
const io = new IoServer(http)

const messages = []

const PORT = process.env.PORT || 8080

http.listen(PORT, () => console.log('Server up'))

io.on('connection', (socket)=>{
    console.log('Nuevo ingreso')
    socket.emit('UPDATE_DATA', messages)
    socket.on('NEW_MESSAGE', data => {
        messages.push(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', data)
    })
})
