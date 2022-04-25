const express = require('express');
const router = express.Router();
const Socket = require('../helper/Sockets');

router.get('/', async (req,res) => {
  try{
    let results = await Socket.readSockets();
    if(results.length==0){
      res.status(200).send([]);
  
    } else {
      res.status(200).json(results).send();
    }
  } catch(e) {
    res.status(500).json(e).send();
  }
});

router.get('/find/:id', async (req,res) => {
  try{
    let results = await Socket.readSocket(req.params.id);
    if(results.length==0){
      res.status(200).send([]);
  
    } else {
      res.status(200).json(results[0]).send();
    }
  } catch(e) {
    res.status(500).json(e).send();
  }
});

router.get('/findBySocketID/:id', async (req,res) => {
  try{
    let results = await Socket.readSocketID(req.params.id);
    if(results.length==0){
      res.status(200).send([]);
  
    } else {
      res.status(200).json(results[0]).send();
    }
  } catch(e) {
    res.status(500).json(e).send();
  }
});

router.post('/create', async (req,res) => {
  if (req.body.SocketID==undefined || req.body.UserID==undefined || req.body.State==undefined){
    res.status(400).send('Provide SocketID, UserID and State!');
  } else {
    try{
      let results = await Socket.createSocket(req.body.SocketID, req.body.UserID, req.body.State);
      res.status(200).send('Successfully created socket!');
    } catch(e) {
      res.status(500).json(e).send();
    }
  }
});

router.post('/update/:id', async (req,res) => {
  try{
    let results = await Socket.readSocketSID(req.params.id);
    if(results.length==0){
      res.status(200).send('No such socket exists!');
    } else {
      try{
        results = results[0];
        let updates = {};
        if(req.body.SocketID==undefined){
          updates.SocketID = results.SocketID;
        } else {
          updates.SocketID = req.body.SocketID;
        }
        if(req.body.State==undefined){
          updates.State = results.State;
        } else {
          updates.State = req.body.State;
        }
        results = await Socket.updateSocket(updates.SocketID, updates.State, req.params.id);
        res.status(200).send('Successfully updated event!');
      } catch(e) {
        res.status(500).json(e).send();
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
      res.status(200).send('No such event exists!');
    } else {
      res.status(200).send('Deleted event!');
    }
  } catch(e) {
    res.status(500).json(e).send();
  }
});

module.exports = router;

