// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const app = express();
const jwt = require('jsonwebtoken');
const cors = require("cors");

const dbpath = "http://"+process.env.DB_HOST+":4000/";
const pnpath = "http://"+process.env.PN_HOST+":3000/";

const port = 2000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.post('/findUserByEmail/', (req, res) => {
  axios.post(dbpath+'users/findByEmail',
    {
      "Email": req.body.Email
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
});

app.post('/login/', (req, res) => {
  axios.post(dbpath+'users/findByEmail',
    {
      "Email": req.body.Email
    },
    {"headers":{"content-type": "application/json"}}
  ).then(function (response){
    if(response.data.length==0){
      res.status(200).send([]);
    } else {
      if(response.data.Password==req.body.Password){
        user_token = jwt.sign({UserID: response.data.UserID}, 'shhh');
        res.status(200).send({user_token: user_token});
      }
      res.status(200).send([response.data]);
    }
  }).catch(function (error){
    res.send(error);
  });
});

app.post('/signup/', (req, res) => {
  axios.post(dbpath+'users/create',
    {
      "UserName": req.body.UserName,
      "Email": req.body.Email,
      "Password": req.body.Password,
      "UserType": req.body.UserType
    },
    {"headers":{"content-type": "application/json"}}
  ).then(function (response){
    axios.post(dbpath+'users/findByUserName',
    {
      "UserName": req.body.UserName
    },
    {"headers":{"content-type": "application/json"}}
    ).then(function (response){
      res.json({UserID: response.data.UserID}).send();
    });
  }).catch(function (error){
    res.send('Username is taken!');
  });
});

app.post("/getUsername", (req, res) => {
  axios.get(dbpath+'users/find/'+req.body.UserID).then(
    function (response){
      if(response.data.length==0){
        res.send({});
      } else {
        res.send({UserName: response.data.UserName});
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});