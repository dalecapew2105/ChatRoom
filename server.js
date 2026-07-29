const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

// Create an HTTP server
const server = http.createServer((req, res) => {

    let filePath;

    if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
    } else {
        filePath = path.join(__dirname, "public", req.url);
    }

    fs.readFile(filePath, (err, data) => {

        if (err) {
            res.writeHead(404);
            res.end("404 Not Found");
            return;
        }

        const ext = path.extname(filePath);

        const types = {
            ".html": "text/html",
            ".js": "text/javascript",
            ".css": "text/css"
        };

        res.writeHead(200, {
            "Content-Type": types[ext] || "text/plain"
        });

        res.end(data);

    });

});


// WebSocket server
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", socket => {

    console.log("Someone connected");

    clients.push(socket);

    socket.on("message", message => {

        clients.forEach(client => {

            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }

        });

    });

    socket.on("close", () => {

        clients = clients.filter(client => client !== socket);

    });

});


server.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});