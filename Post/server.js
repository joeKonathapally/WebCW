// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const dbpath = "http://"+process.env.DB_HOST+":4000/";
const pnpath = "http://"+process.env.PN_HOST+":3000/";


const port = 7000;

app.get('/getPosts', (req, res) => {
  axios.get(dbpath+'posts/').then(function (response){
    if(response.data=="No posts!"){
      res.status(200).send([]);
    } else {
      res.status(200).send(response.data);
    }
  }).catch(function (error){
    res.send(error);
  });
})


app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});