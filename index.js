// Packages used
var express = require("express");
var socket = require("socket.io");


// App
var app = express();
var appServer = app.listen(5000, function(){
    console.log("Running Server....")
});


// Will use any resource in the public folder
app.use(express.static("public"));


// Socket
var io = socket(appServer);
io.on("connection", function(frontendSocket){
    console.log("Connection to socket has been made.... id:", frontendSocket.id)

    frontendSocket.on("chat", function(data){
        io.sockets.emit("chat", data)
    })
});
