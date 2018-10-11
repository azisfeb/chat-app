require('dotenv').config()
const express = require('express')

const app = express()

const index = require('./routes/index')

//set template engine
app.set('view engine', 'twig')
app.use(express.static(__dirname+'/public'))

app.use('/', index)

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`Server now is running on port ${port} .....`)
})

const io      = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('New user connected')

    //default username
    socket.username = "Anonymous"

    //listen on_change username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    socket.on('new_message', (data) => {
        //broadcast the message
        io.sockets.emit('new_message', {message: data.message, username: socket.username})
    })

    socket.on('typing', (data) => {
        io.sockets.emit('typing', {username: socket.username})
    })
})