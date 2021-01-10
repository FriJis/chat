const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

const emitters = require('./server/emitters')

app.get(/\.(js|css)/, (req, res) => {
    res.sendFile(__dirname + '/build' + req.url);
});
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});
io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);
    socket.emit('redirect', '/')
    socket.nick = socket.id
    Object.keys(emitters).forEach(emitter => {
        socket.on(emitter, event => emitters[emitter]({ event, socket, io }))
    })
});
http.listen(4000, () => {
    console.log('Сервер слушает порт 4000');
});