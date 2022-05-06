// server.js
const express = require('express');
//const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require("cors");

const dbpath = "http://"+process.env.DB_HOST+":4000/";
const pnpath = "http://"+process.env.PN_HOST+":3000/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

const port = 7000;

// APIs for POST:
// 1.getPosts - Retrieves all posts
// 2.getPostsbyID - Retrieves a post based on Post ID
// 3.createPosts - Creates a post with a message and user name
// 4.updatePost - Updates the message of a post using it's ID
// 5.deletePostsbyID - Deletes a post based on Post ID

// Retrieves all posts
app.get('/getPosts', (req, res) => {
  axios.get(dbpath+'posts/').then(function (response){
    if(response.data=="No posts!"){
      res.status(200).send(response.data);
    } else {
      res.status(200).send(response.data);
    }
  }).catch(function (error){
    res.send(error);
  });
})

//Retrieving Posts by userID
app.get('/getPostsbyID/:id', (req, res) => {
  axios.get(dbpath+'posts/find/'+req.params.id).then(function (response){
    if(response.data=="No posts!"){
      res.status(200).send(response.data);
    } else {
      res.status(200).send(response.data);
    }
  }).catch(function (error){
    res.send(error);
  });
})

// Creating Posts by userID
app.post('/createPosts', (req, res) => {
  axios.post(
    dbpath+'posts/create',
    {
      Message: req.body.Message,
      CreatedBy:req.body.CreatedBy
    },
    {"headers":{"content-type": "application/json"}}
  ).then(function (response){
    if(response.data=="'Provide message and creator\'s user ID!'"){
      res.status(200).send(response.data);
    } else {
      res.status(200).send('Successfully created post!');
    }
  }).catch(function (error){
    res.send(error);
  });
})



// Updating Posts by userID
app.post('/updatePost/:id', (req, res) => {
  axios.post(
    dbpath+'posts/update/'+req.params.id,
    {
      Message: req.body.Message,
      CreatedBy: req.body.CreatedBy
    },
    {"headers":{"content-type": "application/json"}}
  ).then(function (response){
    if(response.data=="No such post exists!"){
      res.status(200).send(response.data);
    } else {
      res.status(200).send('Successfully updated post!');
    }
  }).catch(function (error){
    res.send(error);
  });
})

// Deleting Posts based on PostID
app.get('/deletePostsbyID/:id', (req, res) => {
  axios.get(dbpath+'posts/delete/'+req.params.id).then(function (response){
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
