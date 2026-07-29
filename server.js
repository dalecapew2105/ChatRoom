const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

const server = new WebSocket.Server({
    port: PORT
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