const webSocketServer = require("websocket").server;
const http = require("http");
const webSocketServerPost = 8000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("WebSocket Server Running...");
});

server.listen(webSocketServerPost,() => {
    console.log("✅ WebSocket Server listening on port 8000...");
});
console.info("listening on port 8000.....");

const wsServer = new webSocketServer({
    httpServer : server,
    autoAcceptConnections: false,
});

const generateID = () => "id" + Math.random().toString(16).slice(2);
const connectedUsers = {};

wsServer.on("request",function(request){
    var id = generateID();
    console.log("connection request from" + request.origin + ".");

    const connection = request.accept(null, request.origin);
    connectedUsers[id] = connection;
    console.log("Connection Established :" + id + " in " + Object.getOwnPropertyNames(connectedUsers));

    connection.on("message", function(message) {
        console.log("Recieved Message : ", message.utf8Data);

        for(id in connectedUsers){
            connectedUsers[id].sendUTF(message.utf8Data);
            console.log("Sent Message to : ", connectedUsers[id]);
        }
    })
})