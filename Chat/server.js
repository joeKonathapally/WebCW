// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const dbpath = "http://"+process.env.DB_HOST+":4000/";
const pnpath = "http://"+process.env.PN_HOST+":3000/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = 8000;

app.use('/', (req, res, next) => {
  try{
    let ut = jwt.verify(req.headers.user_token, 'shhh');
    req.UserID = ut.UserID;
    next();
  }catch(err){
    console.log(err);
    res.status(500).send("Invalid user token!");
  }
})

app.get('/getChats/', (req, res) => {
  axios.get(dbpath+'chatroommemberships/find/'+req.UserID).then(function (response){
    if(response.data.length==0){
      res.status(200).send([]);
    } else {
      res.status(200).send([response.data]);
    }
  }).catch(function (error){
    res.send(error);
  });
});

app.get('/getChat/:CRID', (req, res) => {
  axios.get(dbpath+'chat/find/'+req.params.CRID).then(function (response){
    if(response.data.length==0){
      res.status(200).send([]);
    } else {
      res.status(200).send([response.data]);
    }
  }).catch(function (error){
    res.send(error);
  });
});

app.get('/getChatRooms', (req, res) => {
  axios.get(dbpath+'chatrooms/').then(function (response){
    if(response.data.length==0){
      res.status(200).send([]);
    } else {
      res.status(200).send(response.data);
    }
  }).catch(function (error){
    res.send(error);
  });
});

app.get('/joinChatRoom/:id', (req, res) => {

});

app.post('/createChatRoom', (req, res) => {
  if (req.body.Title==undefined){
    res.send('Provide the title, chat room type and creator\'s user ID!');
  } else {
    axios.post(dbpath+'chatrooms/create',
    {
      Title: req.body.Title,
      CreatedBy: req.UserID,
      ChatRoomType: 'general'
    },
    {"headers":{"content-type": "application/json"}}
    ).then(function (response){
      if(response.data.length==0){
        res.status(200).send([]);
      } else {
        res.status(200).send([response.data]);
      }
    }).catch(function (error){
      res.send(error);
    });
  }
});

app.get('/leaveChatRoom/:id', (req, res) => {

});


app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});