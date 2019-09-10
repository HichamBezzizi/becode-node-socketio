// Socket connection
let frontendSocket = io.connect("http://localhost:1234");


//DOM setup
let chatMessage = document.getElementById("chatMessage");
let userName = document.getElementById("userName");
let chatButton = document.getElementById("chatButton");
let chatData = document.getElementById("chatData");
let users = document.getElementById("users");
let feedback = document.getElementById("feedBack");
let connectUsers = document.getElementById("onlineusers");


//random colors for the chat usernames
let colors = [
    "#df0bbe",
    "#e0a316",
    "#64bd52",
    "#f1075a",
    "#64bd52",
    "#d28c47",
];
let random_color = colors[Math.floor(Math.random() * colors.length)];
document.getElementById("chatData").style.color = random_color;

//Eventlistener for enter key when submitting a msg
chatMessage.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("chatButton").click();
    }
});

//Event for emit
chatButton.addEventListener("click", function () {
    frontendSocket.emit("chat", {
        chatmessage: chatMessage.value,
        username: userName.value,
    })

});


//Event for chat
chatMessage.addEventListener("keypress", function (e) {
    frontendSocket.emit("typing", userName.value)
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("chatButton").click();
    }

});


//Event for listen
frontendSocket.on("chat", function (data) {
    feedback.innerHTML = ""
    chatData.innerHTML += "<p><strong>" + data.username + ": </strong>" + data.chatmessage + "</p>"
    //makes the chat scroll
    document.getElementById("chatData").lastChild.scrollIntoView({ block: "end", behavior: "smooth" })
});

frontendSocket.on("typing", function (data) {
    feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>"
});



//Event for users
frontendSocket.on("get users", function (data) {
    //this will display the users in the frontend
    users.textContent = "Users connected: " + data;
});


//Event for logged in users (WIP)
frontendSocket.on("get a user", (data) => {
    let html = ""
    for (i = 0; i < data.length; i++) {
        // html += `<li class="list-group-item>"${data[i]}</li>`;
        html += `<div id = "onlineUsers">Current users online:${data[i]} </div>`
    }
    connectUsers.innerHTML = html;
    console.log(data)
});

