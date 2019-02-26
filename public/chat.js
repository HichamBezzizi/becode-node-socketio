// Socket connection
var frontendSocket = io.connect("http://localhost:1234");


//DOM setup
var chatMessage = document.getElementById("chatMessage");
var userName = document.getElementById("userName");
var chatButton = document.getElementById("chatButton");
var chatData = document.getElementById("chatData");
var users = document.getElementById("users");
var feedback = document.getElementById("feedBack");
 var colors = [
     "#df0bbe", 
     "#e0a316",
     "#64bd52",
     "#f1075a",
     "#64bd52",
     "#d28c47",
];
var random_color = colors[Math.floor(Math.random() * colors.length)];
document.getElementById("chatData").style.color = random_color;



//Event for emit
chatButton.addEventListener("click",function(){
    frontendSocket.emit("chat", {
        chatmessage: chatMessage.value,
        username: userName.value,
    })

});


//Event for chat
chatMessage.addEventListener("keypress", function(){
    frontendSocket.emit("typing", userName.value)
});


//Event for listen
frontendSocket.on("chat", function(data){
    feedback.innerHTML = ""
    chatData.innerHTML += "<p><strong>" + data.username + ": </strong>" + data.chatmessage + "</p>"
    //makes the chat scroll
    document.getElementById("chatData").lastChild.scrollIntoView()
});

frontendSocket.on("typing", function(data){
    feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>"
});



//Event for users
frontendSocket.on("get users", function(data){
    //this will display the users in the frontend
    users.textContent = "Users connected: " + data;
});
