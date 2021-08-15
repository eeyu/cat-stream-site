const express = require('express');
const app = express();
const server = require('http').Server(app);
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

var ExpressPeerServer = require("peer").ExpressPeerServer;    
var options = {
  debug: true,
  allow_discovery: true,
};
let peerServer = ExpressPeerServer(server, options);
app.use("/peerjs", peerServer);


server.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
