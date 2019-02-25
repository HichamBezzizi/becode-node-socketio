// Socket connection
var frontendSocket = io.connect("http://localhost:5000");


//DOM setup
var chatMessage = document.getElementById("chatMessage");
var userName = document.getElementById("userName");
var chatButton = document.getElementById("chatButton");
var chatData = document.getElementById("chatData");


//Event for emit
chatButton.addEventListener("click",function(){
    frontendSocket.emit("chat", {
        chatmessage: chatMessage.value,
        username: userName.value,
    })

});


//Event for listen
frontendSocket.on("chat", function(data){
    chatData.innerHTML += "<p><strong>" + data.username + ": </strong>" + data.chatmessage + "</p>"
});