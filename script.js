//const socket = new WebSocket(
//    "ws://localhost:8080"
//);

const socket = new WebSocket(
    "wss://chatroom-9doy.onrender.com"
);

socket.onopen = () => {

    console.log("Connected");

};


socket.onmessage = event => {

    let box = document.getElementById("messages");

    box.innerHTML += 
        "<p>" + event.data + "</p>";

};


function sendMessage(){

    let input = document.getElementById("input");

    socket.send(input.value);

    input.value = "";

}