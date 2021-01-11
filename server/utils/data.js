let rooms = new Map()

const joinToRoom = ({ socket, nick }, roomName) => {
    let room = rooms.get(roomName)
    if (!rooms.has(roomName)) {
        room = rooms.set(roomName, {
            crypt_token: socket.id,
            users: new Map()
        }).get(roomName)
    }

    if (room.users.has(nick)) {
        return {
            status: false,
            room: rooms.get(roomName)
        }
    }

    room.users.set(nick, socket.id)
    return {
        status: true,
        room
    }
}

const leaveUser = (nick) => {
    rooms.forEach((room) => {
        if (room.users.has(nick)) {
            room.users.delete(nick)
        }
    })

}

module.exports = {
    joinToRoom,
    leaveUser
}