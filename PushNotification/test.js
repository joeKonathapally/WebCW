//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});
const jwt = require('jsonwebtoken');

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

socket.on('notification', function(notification){
  console.log(notification);
})

const whoami = jwt.sign({UserID: 2}, 'shhh');

socket.emit("whoami", whoami);

socket.emit("pending");

