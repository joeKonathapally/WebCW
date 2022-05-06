const express = require('express');
const router = express.Router();
const Event = require('../helper/Events');

router.get('/', async (req,res) => {
  try{
    let results = await Event.readEvents();
    if(results.length==0){
      res.send('No events!');
  
    } else {
      res.json(results).send();
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.get('/find/:id', async (req,res) => {
  try{
    let results = await Event.readEvent(req.params.id);
    if(results.length==0){
      res.send('No such event exists!');
  
    } else {
      res.json(results[0]).send();
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.post('/create', async (req,res) => {
  console.log("Runnning Event Router")
  if (req.body.EventTitle==undefined || req.body.Message==undefined || req.body.CreatedBy==undefined){
    console.log(req.body)
    res.send('Provide message and creator\'s user ID!');
    console.log("Error Message in Route")
  } else {
    try{
      let results = await Event.createEvent(req.body.EventTitle, req.body.Message, req.body.CreatedBy);
      console.log(results);
      res.send('Successfully created event!');
    } catch(e) {
      res.json(e).send();
    }
  }
});

router.post('/update/:id', async (req,res) => {
  try{
    let results = await Event.readEvent(req.params.id);
    if(results.length==0){
      res.send('No such event exists!');
    } else {
      try{
        results = results[0];
        // console.log(results);
        // console.log(req.body.Message);
        let updates = {};
        if(req.body.EventTitle==undefined){
          updates.EventTitle = results.EventTitle;
        } else {
          updates.EventTitle = req.body.EventTitle;
        }
        if(req.body.Message==undefined){
          updates.Message = results.Message;
        } else {
          updates.Message = req.body.Message;
        }
        results = await Event.updateEvent(updates.EventTitle, updates.Message, req.params.id);
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
    let results = await Event.deleteEvent(req.params.id);
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

