// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require("cors");
const timestamp = require('time-stamp');

const dbpath = "http://"+process.env.DB_HOST+":4000/";
const pnpath = "http://"+process.env.PN_HOST+":3000/";
const eventpath = "http://"+process.env.DB_HOST+":6000/";
const postpath = "http://"+process.env.PN_HOST+":7000/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

const port = 8000;

app.get("/getFeed", async (req, res) => {
  let posts = [];
  let events = [];
  let feed = [];
  axios.get(postpath+'getPosts').then(
    function(response){
      for( let i=0; i<response.data.length;i++){
        posts.push({
          PostID: response.data[i].PostID,
          Message: response.data[i].Message,
          CreatedAt: response.data[i].CreatedAt,
          UpdatedAt: response.data[i].UpdatedAt,
          CreatedByID: response.data[i].CreatedByID,
          ObjectType: "post"
        })
        feed.push({
          PostID: response.data[i].PostID,
          Message: response.data[i].Message,
          CreatedAt: response.data[i].CreatedAt,
          UpdatedAt: response.data[i].UpdatedAt,
          CreatedByID: response.data[i].CreatedByID,
          ObjectType: "post"
        })
      }
      axios.get(eventpath+'getEvents').then(
        async function(response){
          for( let i=0; i<response.data.length;i++){
            events.push({
              EventID: response.data[i].EventID,
              EventTitle: response.data[i].EventTitle,
              Message: response.data[i].Message,
              CreatedAt: response.data[i].CreatedAt,
              UpdatedAt: response.data[i].UpdatedAt,
              CreatedByID: response.data[i].CreatedByID,
              ObjectType: "event"
            })
            feed.push({
              EventID: response.data[i].EventID,
              EventTitle: response.data[i].EventTitle,
              Message: response.data[i].Message,
              CreatedAt: response.data[i].CreatedAt,
              UpdatedAt: response.data[i].UpdatedAt,
              CreatedByID: response.data[i].CreatedByID,
              ObjectType: "event"
            })
          }
          feed.sort(
            function(a, b){
              return parseInt(b.CreatedAt.split(':').join('').split('/').join(''))-parseInt(a.CreatedAt.split(':').join('').split('/').join(''));
            }
          )
          res.send({Feed: feed, Posts: posts, Events: events});
        }
      )
    }
  )
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
