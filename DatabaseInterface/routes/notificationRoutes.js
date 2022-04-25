const express = require('express');
const router = express.Router();
const Notification = require('../helper/Notifications');

router.get('/', async (req,res) => {
  try{
    let results = await Notification.readNotifications();
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
    let results = await Notification.readNotification(req.params.id);
    if(results.length==0){
      res.status(200).send([]);
  
    } else {
      res.status(200).json(results[0]).send();
    }
  } catch(e) {
    res.status(500).json(e).send();
  }
});

router.get('/findByUserID/:id', async (req,res) => {
  try{
    let results = await Notification.readNotificationUID(req.params.id);
    if(results.length==0){
      res.status(200).send([]);
  
    } else {
      res.status(200).json(results).send();
    }
  } catch(e) {
    res.status(500).json(e).send();
  }
});

router.post('/create', async (req,res) => {
  if (req.body.Payload==undefined || req.body.UserID==undefined){
    res.status(400).send('Provide Payload and UserID!');
  } else {
    try{
      let results = await Notification.createNotification(req.body.Payload, req.body.UserID);
      res.status(200).send('Successfully created notifications!');
    } catch(e) {
      res.status(500).json(e).send();
    }
  }
});

router.post('/update/:id', async (req,res) => {
  try{
    let results = await Notification.readNotification(req.params.id);
    if(results.length==0){
      res.status(200).send('No such notification exists!');
    } else {
      try{
        results = results[0];
        let updates = {};
        if(req.body.Payload==undefined){
          updates.Payload = results.Payload;
        } else {
          updates.Payload = req.body.Payload;
        }
        results = await Notification.updateNotification(updates.Payload, req.params.id);
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
    let results = await Notification.deleteNotification(req.params.id);
    if(results==0){
      res.status(200).send('No such notification exists!');
    } else {
      res.status(200).send('Deleted notification!');
    }
  } catch(e) {
    res.status(500).json(e).send();
  }
});

module.exports = router;

