// Packages used
const express = require("express");
const socket = require("socket.io");


// App
const app = express();
const appServer = app.listen(1234, () => {
    console.log("Running Server....")
});


// Will use any resource in the public folder
app.use(express.static("public"));


// Socket
let io = socket(appServer);
io.on("connection", function (frontendSocket) {
    console.log("Connection to socket has been made.... id:", frontendSocket.id)

    frontendSocket.on("chat", function (data) {
        io.sockets.emit("chat", data)
    })

    frontendSocket.on("typing", function (data) {
        frontendSocket.broadcast.emit("typing", data)
    })
});


//displays how many users are connected
users = [];
connections = [];
//users connected
io.sockets.on('connection', (socket) => {
    connections.push(socket);
    io.sockets.emit("get users", connections.length)
    console.log('Connected: %s user(s) connected', connections.length);

    //users disconnected
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s user(s) connected', connections.length);
    })
    //new users
    socket.on("new user", (data, callback) => {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUser();

    })
    const updateUser = () => {
        io.sockets.emit("get a user", users);
    }
});

