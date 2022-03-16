const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express()
app.set('views', path.join(__dirname, 'views'));

let messages = []
let userName = []

app.use(express.static(path.join(__dirname, '/client')))

app.use('/', function(req, res) {
    res.render('index')
})

const server = app.listen(8000, () => {
    console.log('server is running...')
})

const io = socket(server)

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
      });
    socket.on('disconnect', () => { console.log('Oh socket' + socket.id + 'has left')})
    console.log('I\'ve added a listener on message event \n');
  });