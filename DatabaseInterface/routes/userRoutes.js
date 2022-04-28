const express = require('express');
const router = express.Router();
const User = require('../helper/Users');

router.get('/', async (req,res) => {
  try{
    let results = await User.readUsers();
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
    let results = await User.readUser(req.params.id);
    if(results.length==0){
      res.send([]);
  
    } else {
      res.json(results[0]).send();
    }
  } catch(e) {
    res.json(e).send();
  }
});

router.get('/findByEmail/:email', async (req,res) => {
  try{
    let results = await User.readUserEmail(req.params.email);
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
  if (req.query.UserName==undefined || req.query.Password==undefined || req.query.Email==undefined || req.query.UserType==undefined){
    res.send('Provide username, password, email and usertype!');
  } else {
    try{
      let results = await User.createUser(req.query.UserName, req.query.Password, req.query.Email, req.query.UserType);
      console.log(results);
      res.send('Successfully created user!');
    } catch(e) {
      res.json(e).send();
    }
  }
});

router.post('/update/:id', async (req,res) => {
  try{
    let results = await User.readUser(req.params.id);
    if(results.length==0){
      res.send('No such user exists!');
  
    } else {
      try{
        results = results[0];
        let updates = {};
        if(req.query.UserName==undefined){
          updates.UserName = results.UserName;
        } else {
          updates.UserName = req.query.UserName;
        }
        if(req.query.Password==undefined){
          updates.Password = results.Password;
        } else {
          updates.Password = req.query.Password;
        }
        if(req.query.Email==undefined){
          updates.Email = results.Email;
        } else {
          updates.Email = req.query.Email;
        }
        if(req.query.UserType==undefined){
          updates.UserType = results.UserType;
        } else {
          updates.UserType = req.query.UserType;
        }
        results = await User.updateUser(updates.UserName, updates.Password, updates.Email, updates.UserType, req.params.id);
        res.send('Successfully updated user!');
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
    let results = await User.deleteUser(req.params.id);
    if(results==0){
      res.send('No such user exists!');
    } else {
      res.send('Deleted user!');
    }
  } catch(e) {
    res.json(e).send();
  }
});

module.exports = router;

