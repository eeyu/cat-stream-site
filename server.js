const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)

const serverId = 0;

app.set('view engine', 'ejs');
app.use(express.static('public'));

var roomId = 1;

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/host-video', (req, res) => {
    res.render('video-host');
})

io.on('connection', socket => {
    socket.on('join-room', (userId) => {
        socket.join(roomId);
        socket.broadcast.emit("joined: " + userId);
    })
})

server.listen(3000);
