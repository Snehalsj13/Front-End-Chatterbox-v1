/* global require */
var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var topic;
var messages = [];
/*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
console.log("websockets server started");

ws.on("connection", function(socket) {
  if(topic){
    socket.send("*** Topic is '" + topic + "'");
  }
  console.log("client connection established");
  messages.forEach(function(msg) {
    socket.send(msg);
  });
  socket.on("message", function(data) {
    console.log("message received: " + data);
    if(data.startsWith("/topic")){
      topic =  data.substring(7,data.length);
    }
    messages.push(data);
    ws.clients.forEach(function(clientSocket) {
      if(data.startsWith("/topic")){
        clientSocket.send("*** Topic has changed to " + topic + "'");
      }else{
        clientSocket.send(data);
      }
    });
  });
});
