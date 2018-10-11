$(function(){
    //create connection
    const socket = io.connect('http://localhost:4567')

    //cache DOM
    const message       = $('#message')
    const username      = $('#username')
    const send_message  = $('#send_message')
    const send_username = $('#send_username')
    const chatroom      = $('#chatroom')
    const feedback      = $('#feedback')

    //emit message
    send_message.click(function(){
        socket.emit('new_message', {message: message.val()})
    })

    socket.on('new_message', (data) => {
        feedback.html('')
        message.val('')
        chatroom.append(`<p class="message"> ${data.username}: ${data.message} </p>`)
    })

    //emit a username
    send_username.on('click', function(){
        socket.emit('change_username', {username: username.val()})
    })

    //emit typing
    message.bind('keypress', () => {
        socket.emit('typing')
    })

    socket.on('typing', (data) => {
        feedback.html("<p><i>"+ data.username +" is typing message... </i></p>")
    })
})