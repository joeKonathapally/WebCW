const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http, {cors:{origin:"*"}});
const jwt = require('jsonwebtoken');
const cors = require("cors");

app.use(cors());

const path = "http://"+process.env.HOST+":4000/"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/notify', (req, res) => {
  let Payload = req.body.Payload;
  let UserID = req.body.UserID;
  axios.get(
    path+'sockets/find/'+UserID,
  ).then(function (response){
    if(response.data.length!=0){
      if(response.data.State=="Alive"){
        io.to(response.data.SocketID).emit("notification", Payload);
      } else {
        axios.post(
          path+'notifications/create',
          {
            Payload: Payload,
            UserID: UserID
          },
          {"headers":{"content-type": "application/json"}}
        ).then(function (response){
          console.log('Cached notification!');
        });
      }
    } else {
      axios.post(
        path+'notifications/create',
        {
          Payload: Payload,
          UserID: UserID
        },
        {"headers":{"content-type": "application/json"}}
      ).then(function (response){
        console.log('Cached notification!');
      });
    }
    res.status(200).send();
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');

  let validSession = false;

  socket.on("whoami", (me) => {
    const decode = me;
    validSession = true;
    console.log(socket.id);
    axios.get(
      path+'sockets/find/'+decode.UserID
    ).then(function (response){
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
        axios.post(
          path+'sockets/update/'+response.data.SID, 
          {
            SocketID: socket.id,
            State: "Alive"
          },
          {"headers":{"content-type": "application/json",}}
        ).then(function (response){
        });
      }
    })
  });

  socket.on("pending", ()=>{
    if(validSession){
      axios.get(
        path+'sockets/findBySocketID/'+socket.id,
        {"headers":{"content-type": "application/json",}}
      ).then(function (response){
        axios.get(
          path+'notifications/findByUserID/'+response.data.UserID,
        ).then(function (response){
          for(let i=0; i<response.data.length;i++){
            socket.emit("notification", response.data[i].Payload)
          }
          for(let i=0; i<response.data.length;i++){
            axios.get(
              path+'notifications/delete/'+response.data[i].NotificationID
            ).then(function (response){
              console.log('Cleared cache');
            });
          }
        });
      });
    }
  })

  socket.on('disconnect', ()=>{
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