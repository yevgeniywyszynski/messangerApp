const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express()
app.set('views', path.join(__dirname, 'views'));

let messages = []
let users = []

app.use(express.static(path.join(__dirname, '/client')))

app.use('/', function(req, res) {
    res.render('index')
})

const server = app.listen(8000, () => {
    console.log('server is running...')
})

const io = socket(server)

io.on('connection', (socket) => {
    console.log('New client! its id - ' + socket.id);

    socket.on('join', name => {
        users.push({"name":name, "id":socket.id})
        socket.broadcast.emit('message', {"author": 'Chat Bot', "content": `${name} has joined the conversation`})
    })

    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message)
        socket.broadcast.emit('message', message);
    })

   socket.on('disconnect', () => {
       let user = users.find(e => e.id == socket.id)
       socket.broadcast.emit('message', {author: 'Chat bot', content: `${user?.name} has left the conversation... :(`})
   })
})