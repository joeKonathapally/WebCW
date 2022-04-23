const express = require('express');
const router = express.Router();
const Socket = require('../helper/Sockets');

router.get('/', async (req,res) => {
  try{
    let results = await Socket.readSockets();
    if(results.length==0){
      res.send([]);
  
    } else {
      res.json(results).send();
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.get('/find/:id', async (req,res) => {
  try{
    let results = await Socket.readSocket(req.params.id);
    if(results.length==0){
      res.send([]);
  
    } else {
      res.json(results[0]).send();
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.post('/create', async (req,res) => {
  if (req.body.SocketID==undefined || req.body.UserID==undefined || req.body.State==undefined){
    res.send('Provide message and creator\'s user ID!');
  } else {
    try{
      let results = await Socket.createSocket(req.body.SocketID, req.body.UserID, req.body.State);
      console.log(results);
      res.send('Successfully created event!');
    } catch(e) {
      res.json(e).send();
    }
  }
});

router.post('/update/:id', async (req,res) => {
  try{
    let results = await Socket.readSocket(req.params.id);
    if(results.length==0){
      res.send('No such event exists!');
    } else {
      try{
        results = results[0];
        let updates = {};
        if(req.body.SocketID==undefined){
          updates.SocketID = results.SocketID;
        } else {
          updates.SocketID = req.body.SocketID;
        }
        if(req.body.UserID==undefined){
          updates.UserID = results.UserID;
        } else {
          updates.UserID = req.body.UserID;
        }
        if(req.body.State==undefined){
          updates.State = results.State;
        } else {
          updates.State = req.body.State;
        }
        results = await Socket.updateSocket(updates.SocketID, updates.UserID, updates.State, req.params.id);
        res.send('Successfully updated event!');
      } catch(e) {
        res.json(e).send();
      }
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.get('/delete/:id', async (req,res) => {
  try{
    let results = await Socket.deleteSocket(req.params.id);
    if(results==0){
      res.send('No such event exists!');
    } else {
      res.send('Deleted event!');
    }
  } catch(e) {
    res.json(e).send();
  }
});

module.exports = router;

