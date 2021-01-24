const http = require('http')
const express = require('express')
var path = require('path')
var cors = require('cors')
var socket = require('socket.io')


var app = express()
var server = http.createServer(app)
var io = socket(server)

app.use(express.static(path.join(__dirname, 'template')))

//Run when connection

io.on('connection' , socket => {
    console.log('New Connection')
    socket.broadcast.emit('message' , 'A user has joined the chat')
    
    socket.on('disconnect' , () => {
        io.emit('message' , "A user has disconnected")
    })

    socket.on('input-message' , (message) => {
        console.log(message)
        socket.broadcast.emit('message' , message)
    })

   
})



server.listen(4000)