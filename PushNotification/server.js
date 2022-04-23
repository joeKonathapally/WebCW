const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = "http://"+process.env.HOST+":4000/"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const messages = [
  {name: "Tim", message: "yo"},
  {name: "Pam", message: "hi"}
]

app.get('/messages', (req, res) => {
  res.send(messages);
})

app.post('/message', (req, res) => {
  messages.push(req.body);
  io.emit('message', req.body);
  res.sendStatus(200);
})

app.post('/notify', (req, res) => {
  let payload = req.body.payload;
  let UserID = req.body.UserID;

});

io.on('connection', (socket) => {
  console.log(socket.id);
  console.log('a user connected');
  socket.on("whoami", (me) => {
    console.log(me.id);
    axios.post(path+'sockets/create', {
      SocketID: 123,
      UserID: 1,
      State: "alive"
    }).then(function (response){
      console.log(response);
    })
  });
});

const server = http.listen(3000, () => {
  const {port} = server.address();
  console.log(`Listening on port ${port}`);
});