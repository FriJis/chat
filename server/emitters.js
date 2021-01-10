let data = {}

const { getRoom, leaveFromAllRooms, redirect } = require('./utils/helpers')

const join = ({ event: {nick, pass}, socket, io }) => {

    leaveFromAllRooms(socket)

    pass = pass.toString()
    if (!data[pass]) {
        data[pass] = {
            crypt_token: socket.id
        }
    }
    socket.nick = nick
    socket.emit('setCryptToken', data[pass].crypt_token)
    socket.join(pass)
    redirect(socket, '/mess')
    io.to(pass).emit('chat/message/server')
}

const sendMessage = ({ socket, event, io }) => {
    console.log(event);
    io.to(getRoom(socket)).emit('chat/message/from-user', {
        nick: socket.nick,
        message: event
    })
}



module.exports = {
    join,
    sendMessage
}