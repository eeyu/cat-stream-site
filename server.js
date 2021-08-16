const express = require('express');
const app = express();
// const server = require('http').Server(app);
const server = app.listen(process.env.PORT || 3000)
app.use('/peerjs', require('peer').ExpressPeerServer(server, {
	debug: true
}))
const io = require('socket.io')(server)

const roomId = 1;

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('visitor');
})

app.get('/host-video', (req, res) => {
    res.render('host');
})

io.on('connection', socket => {
    socket.on('user-joined', (userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId);
        })

        socket.on('host-is-ready', () => {
            socket.to(roomId).emit('host-is-ready');
        })
    })
})

// const { PeerServer } = require('peer');
// const peerServer = PeerServer({ port: 3001, path: '/peerjs' });

// server.listen(process.env.PORT || 3000, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });
