const express = require('express');
const router = express.Router();
const ChatRoom = require('../helper/ChatRooms');

router.get('/', async (req,res) => {
  try{
    let results = await ChatRoom.readChatRooms();
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
    let results = await ChatRoom.readChatRoom(req.params.id);
    if(results.length==0){
      res.send('No such chatRoom exists!');
  
    } else {
      res.json(results[0]).send();
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.post('/create', async (req,res) => {
  if (req.body.Title==undefined || req.body.CreatedBy==undefined, req.body.ChatRoomType==undefined){
    res.send('Provide the title, chat room type and creator\'s user ID!');
  } else {
    try{
      let results = await ChatRoom.createChatRoom(req.body.Title, req.body.ChatRoomType, req.body.CreatedBy);
      res.status(200).send('Successfully created chatRoom!');
    } catch(e) {
      res.status(500).json(e).send();
    }
  }
});

router.post('/update/:id', async (req,res) => {
  try{
    let results = await ChatRoom.readChatRoom(req.params.id);
    if(results.length==0){
      res.send('No such chatRoom exists!');
    } else {
      try{
        results = results[0];
        let updates = {};
        if(req.body.Title==undefined){
          updates.Title = results.Title;
        } else {
          updates.Title = req.body.Title;
        }
        results = await ChatRoom.updateChatRoom(updates.Title, req.params.id);
        res.send('Successfully updated chatRoom!');
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
    let results = await ChatRoom.deleteChatRoom(req.params.id);
    if(results==0){
      res.send('No such chatRoom exists!');
    } else {
      res.send('Deleted chatRoom!');
    }
  } catch(e) {
    res.json(e).send();
  }
});

module.exports = router;

