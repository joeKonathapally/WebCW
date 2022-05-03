const express = require('express');
const router = express.Router();
const Chat = require('../helper/Chats');

router.get('/', async (req,res) => {
  try{
    let results = await Chat.readChats();
    if(results.length==0){
      res.send('No chats!');
  
    } else {
      res.json(results).send();
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.get('/find/:id', async (req,res) => {
  try{
    let results = await Chat.readChat(req.params.id);
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
  if (req.body.Message==undefined || req.query.CreatedBy==undefined){
    res.send('Provide message and creator\'s user ID!');
  } else {
    try{
      let results = await Chat.createChat(req.body.Message, req.query.CreatedBy);
      console.log(results);
      res.send('Successfully created chat!');
    } catch(e) {
      res.json(e).send();
    }
  }
});

router.post('/update/:id', async (req,res) => {
  try{
    let results = await Chat.readChat(req.params.id);
    if(results.length==0){
      res.send('No such chat exists!');
    } else {
      try{
        results = results[0];
        // console.log(results);
        // console.log(req.body.Message);
        let updates = {};
        if(req.body.Message==undefined){
          updates.Message = results.Message;
        } else {
          updates.Message = req.body.Message;
        }
        results = await Chat.updateChat(updates.Message, req.params.id);
        res.send('Successfully updated chat!');
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
    let results = await Chat.deleteChat(req.params.id);
    if(results==0){
      res.send('No such chat exists!');
    } else {
      res.send('Deleted chat!');
    }
  } catch(e) {
    res.json(e).send();
  }
});

module.exports = router;

