const express = require('express');
const router = express.Router();
const Post = require('../helper/Posts');

router.get('/', async (req,res) => {
  try{
    let results = await Post.readPosts();
    if(results.length==0){
      res.send('No posts!');

    } else {
        res.json(results).send();
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.get('/find/:id', async (req,res) => {
  try{
    let results = await Post.readPost(req.params.id);
    if(results.length==0){
      res.send('No such post exists!');

    } else {
      res.json(results[0]).send();
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.post('/create', async (req,res) => {
  console.log("Inside post");
  console.log(req.body);
  if (req.body.Message==undefined || req.body.CreatedBy==undefined){
    res.send('Provide message and creator\'s user ID!');
  } else {
    try{
      console.log("Inside post 2");
      let results = await Post.createPost(req.body.Message, req.body.CreatedBy);
      console.log(results);
      res.send('Successfully created post!');
    } catch(e) {
      res.json(e).send();
    }
  }
});

router.post('/update/:id', async (req,res) => {
  try{
    let results = await Post.readPost(req.params.id);
    if(results.length==0){
      res.send('No such post exists!');
    } else {
      try{
        results = results[0];
        console.log(results);
        console.log(req.body.Message);
        let updates = {};
        if(req.body.Message==undefined){
          updates.Message = results.Message;
        } else {
          updates.Message = req.body.Message;
        }
        results = await Post.updatePost(updates.Message, req.params.id);
        res.send('Successfully updated post!');
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
    let results = await Post.deletePost(req.params.id);
    if(results==0){
      res.send('No such post exists!');
    } else {
      res.send('Deleted post!');
    }
  } catch(e) {
    res.json(e).send();
  }
});

module.exports = router;
