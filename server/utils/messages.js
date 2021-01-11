const leaveFromRoom = ({socket, io}, room) => {
    io.to(room).emit('chat/message/server', {
        nick: socket.nick,
        message: `Goodbyu, ${socket.nick}`
    })
}

const joinToRoom = ({socket: {nick}, io}, room) => {
    io.to(room).emit('chat/message/server', {
        nick,
        message: `Hello, ${nick}`
    })
}

const sendCryptToken = ({socket}, token) => {
    socket.emit('setCryptToken', token)
}

module.exports = {
    leaveFromRoom,
    joinToRoom,
    sendCryptToken
}