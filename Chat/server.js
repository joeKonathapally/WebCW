// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const dbpath = "http://"+process.env.DB_HOST+":4000/";
const pnpath = "http://"+process.env.PN_HOST+":3000/";


const port = 2000;

app.get('/getChats/:id', (req, res) => {

});

app.get('/getChatRooms', (req, res) => {

});

app.get('/joinChatRoom/:id' (req, res) => {

});

app.get('/createChatRoom', (req, res) => {

});

app.get('/leaveChatRoom/:id', (req, res) => {

});


app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});