const express = require('express');
const router = express.Router();
const ChatRoomMembership = require('../helper/ChatRoomMemberships');

router.get('/', async (req,res) => {
  try{
    let results = await ChatRoomMembership.readChatRoomMemberships();
    if(results.length==0){
      res.send('No chatroom memberships!');
  
    } else {
      res.json(results).send();
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.get('/find/:id', async (req,res) => {
  try{
    let results = await ChatRoomMembership.readChatRoomMembership(req.params.id);
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
  if (req.body.ChatRoomID==undefined || req.body.UserID==undefined, req.body.ChatRoomType==undefined){
    res.send('Provide the chat room id, chat room type and creator\'s user ID!');
  } else {
    try{
      let results = await ChatRoomMembership.createChatRoomMembership(req.body.ChatRoomType, req.body.UserID, req.body.ChatRoomID);
      res.send('Successfully created chatroom membership!');
    } catch(e) {
      res.json(e).send();
    }
  }
});

router.post('/update/:id', async (req,res) => {
  try{
    let results = await ChatRoomMembership.readChatRoomMembershipCRM(req.params.id);
    if(results.length==0){
      res.send('No such chatroom membership exists!');
    } else {
      try{
        results = results[0];
        let updates = {};
        if(req.body.ChatRoomID==undefined){
          updates.ChatRoomID = results.ChatRoomID;
        } else {
          updates.ChatRoomID = req.body.ChatRoomID;
        }
        results = await ChatRoomMembership.updateChatRoomMembership(updates.ChatRoomID, req.params.id);
        res.send('Successfully updated chatroom membership!');
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
    let results = await ChatRoomMembership.deleteChatRoomMembership(req.params.id);
    if(results==0){
      res.send('No such chatroom membership exists!');
    } else {
      res.send('Deleted chatroom membership!');
    }
  } catch(e) {
    res.json(e).send();
  }
});

module.exports = router;

