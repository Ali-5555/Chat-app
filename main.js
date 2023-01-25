const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/chatprogram') 

const chatSchema = new mongoose.Schema({
    user: String,
    message: String
})

const Chat = mongoose.model('Chat', chatSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', (socket) => {
    socket.on('chat message', (username, msg) => {
        Chat.create(
            {user: username, message: msg}
        )
        io.emit('chat message', username + ': ' + msg); 
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});