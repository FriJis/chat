const messages = require('./messages')

const getRoom = ({rooms}) => {
    return [...rooms][0]
}

const leaveFromAllRooms = ({socket, io}) => {
    for (const room of socket.rooms) {
        messages.leaveFromRoom({socket, io}, room)
        socket.leave(room)
    }
}
const redirect = (socket, route) => {
    socket.emit('redirect', route)
}

module.exports = {
    getRoom,
    leaveFromAllRooms,
    redirect,
}