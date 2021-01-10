const getRoom = ({rooms}) => {
    return [...rooms][0]
}

const leaveFromAllRooms = (socket) => {
    console.log(socket.rooms)
    for (const room of socket.rooms) {
        socket.to(room).emit("chat/user/left", socket.id);
        socket.leave(room)
    }
}
const redirect = (socket, route) => {
    socket.emit('redirect', route)
}

module.exports = {
    getRoom,
    leaveFromAllRooms,
    redirect
}