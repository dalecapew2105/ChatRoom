//const socket = new WebSocket(
//    "ws://localhost:8080"
//);

const socket = new WebSocket(
    window.location.origin.replace("http", "ws")
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