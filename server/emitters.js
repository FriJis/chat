
const { getRoom, leaveFromAllRooms, redirect } = require('./utils/helpers')
const messages = require('./utils/messages')
const data = require('./utils/data')

const join = ({ event: { nick, pass }, socket, io }) => {

    leaveFromAllRooms({ socket, io })

    const room = data.joinToRoom({ socket }, pass)

    socket.nick = nick
    messages.sendCryptToken({ socket }, room.crypt_token)
    socket.join(pass)
    redirect({socket}, '/mess')
    messages.joinToRoom({ socket, io }, pass)
}

const sendMessage = ({ socket, event, io }) => {
    console.log(event);
    io.to(getRoom(socket)).emit('chat/message/from-user', {
        nick: socket.nick,
        message: event
    })
}

const disconnecting = ({ socket, io }) => {
    leaveFromAllRooms({ socket, io })
}

const disconnected = ({ socket, io }) => {
    redirect({ socket }, '/')
    leaveFromAllRooms({ socket, io })
}

module.exports = {
    join,
    sendMessage,
    disconnecting,
    disconnected
}