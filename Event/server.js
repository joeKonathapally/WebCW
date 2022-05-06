// server.js
const express = require('express');
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

const port = 6050;

// APIs for EVENTS: 
// 1.getEvents - Retrieves all posts
// 2.getEventsbyID - Retrieves a post based on Post ID
// 3.createEvents - Creates a post with a message and user name
// 4.updateEvent - Updates the message of a post using it's ID
// 5.deleteEventsbyID - Deletes a post based on Post ID


// Retrieves all events
app.get('/getEvents', (req, res) => {
  axios.get(dbpath+'events/').then(function (response){
    if(response.data=="No Events!"){
      res.status(200).send(response.data);
    } else {
      res.status(200).send(response.data);
    }
  }).catch(function (error){
    res.send(error);
  });
})

//Retrieving Events by userID
app.get('/getEventsbyID/:id', (req, res) => {
  axios.get(dbpath+'events/find/'+req.params.id).then(function (response){
    if(response.data=="No such event exists!"){
      res.status(200).send(response.data);
    } else {
      res.status(200).send(response.data);
    }
  }).catch(function (error){
    res.send(error);
  });
})

// Creating Events by userID
app.post('/createEvents', (req, res) => {
  console.log("Runnning Event in Event")
  axios.post(
    dbpath+'events/create',
    {
      EventTitle: req.body.EventTitle,
      Message: req.body.Message,
      CreatedBy:req.body.CreatedBy
    },
    {"headers":{"content-type": "application/json"}}
  ).then(function (response){
    if(response.data=="'Provide message and creator\'s user ID!'"){
      res.status(200).send(response.data);
    } else {
      axios.get(dbpath+'users/').then(function (response){
        for(let i=0;i<response.data.length;i++){
          if(response.data[i].UserID!=req.body.CreatedBy){
            console.log('Sending'+response.data[i].UserName);
            axios.post(pnpath+'notify',
            {
              Payload: {
                NotificationType: "Event",
                Message: "New event!!!"
              },
              UserID: response.data[i].UserID
            }
            ).then(function (response){
              console.log('sent notification prompt');
            });
          }
        }
      });
      res.status(200).send('Successfully created event!');
    }
  }).catch(function (error){
    res.send(error);
  });
})

// Updating Events by userID
app.post('/updateEvent/:id', (req, res) => {
  axios.post(
    dbpath+'events/update/'+req.params.id,
    {
      EventTitle: req.body.EventTitle,
      Message: req.body.Message,
      CreatedBy: req.body.CreatedBy
    },
    {"headers":{"content-type": "application/json"}}
  ).then(function (response){
    if(response.data=="No such event exists!"){
      res.status(200).send(response.data);
    } else {
      res.status(200).send('Successfully updated event!');
    }
  }).catch(function (error){
    res.send(error);
  });
})

// Deleting Events based on PostID
app.get('/deleteEventsbyID/:id', (req, res) => {
  axios.get(dbpath+'events/delete/'+req.params.id).then(function (response){
    if(response.data=="No Events!"){
      res.status(200).send("No such event exists!");
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