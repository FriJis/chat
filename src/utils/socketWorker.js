import sio from 'socket.io-client'

export const io = sio('ws://127.0.0.1:4000/')

export const join = (data) => {
    io.emit('join', data)
}

export const sendMessage = (message) => {
    io.emit('sendMessage', message)
}