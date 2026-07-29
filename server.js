const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

// Create a normal HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ChatRoom WebSocket server is running!");
});

// Attach a WebSocket server to it
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", (socket) => {
    console.log("Someone connected");

    clients.push(socket);

    socket.on("message", (message) => {
        console.log(message.toString());

        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    socket.on("close", () => {
        console.log("Someone disconnected");

        clients = clients.filter(client => client !== socket);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});