let data = {}

const joinToRoom = ({socket}, room) => {
    if (!data[room]) {
        data[room] = {
            crypt_token: socket.id
        }
    }
    
    return data[room]
}



module.exports = {
    joinToRoom
}