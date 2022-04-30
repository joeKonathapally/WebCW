// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const app = express();

const dbpath = "http://"+process.env.DB_HOST+":4000/";
const pnpath = "http://"+process.env.PN_HOST+":3000/";

const port = 2000;

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

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});