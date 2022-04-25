const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');

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
  let Payload = req.body.Payload;
  let UserID = req.body.UserID;
  axios.get(
    path+'sockets/find/'+UserID,
  ).then(function (response){
    if(response.data.length==0){
      
    } else {

    }
    console.log(response);
    res.status(200).send();
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("whoami", (me) => {
    const decode = jwt.verify(me,'shhh');
    console.log(socket.id);
    axios.get(
      path+'sockets/find/'+decode.UserID
    ).then(function (response){
      // console.log(response.data)
      if(response.data.length==0){
        axios.post(
          path+'sockets/create', 
          {
            SocketID: socket.id,
            UserID: decode.UserID,
            State: "Alive"
          },
          {"headers":{"content-type": "application/json",}}
        );
      } else {
        console.log('reaching the update portion');
        console.log(response.data.SID);
        axios.post(
          path+'sockets/update/'+response.data.SID, 
          {
            SocketID: socket.id,
            State: "Alive"
          },
          {"headers":{"content-type": "application/json",}}
        ).then(function (response){
          console.log(response);
        });
      }
    })
  });

  socket.on('disconnect', ()=>{
    console.log('monkey jumping');
    console.log(socket.id);
    axios.get(
      path+'sockets/findBySocketID/'+socket.id,
      {"headers":{"content-type": "application/json",}}
    ).then(function (response){
      axios.post(
        path+'sockets/update/'+response.data.SID, 
        {
          State: "Dead"
        },
        {"headers":{"content-type": "application/json",}}
      );
    });
    console.log('disconnected');
  });

});

const server = http.listen(3000, () => {
  const {port} = server.address();
  console.log(`Listening on port ${port}`);
});