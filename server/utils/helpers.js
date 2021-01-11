const messages = require('./messages')
const data = require('./data')

const getRoom = ({rooms}) => {
    return [...rooms][0]
}

const leaveFromAllRooms = ({socket, io}) => {
    data.leaveUser(socket.nick)
    for (const room of socket.rooms) {
        messages.leaveFromRoom({socket, io}, room)
        socket.leave(room)
    }
}
const redirect = ({socket}, route) => {
    socket.emit('redirect', route)
}

module.exports = {
    getRoom,
    leaveFromAllRooms,
    redirect,
}