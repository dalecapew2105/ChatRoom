const WebSocket = require("ws");

const server = new WebSocket.Server({
    port: 8080
});

let clients = [];

server.on("connection", socket => {

    console.log("Someone connected");

    clients.push(socket);


    socket.on("message", message => {

        console.log(message.toString());

        // send message to everybody
        clients.forEach(client => {

            client.send(message.toString());

        });

    });


    socket.on("close", () => {

        console.log("Someone disconnected");

        clients = clients.filter(client => client !== socket);

    });

});


console.log("Server running on port 8080");