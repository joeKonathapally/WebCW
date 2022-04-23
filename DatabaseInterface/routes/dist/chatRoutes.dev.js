"use strict";

var express = require('express');

var router = express.Router();
router.get('/', function (req, res) {});
router.get('/find/:id', function (req, res) {});
router.post('/create', function (req, res) {});
router.post('/update/:id', function (req, res) {});
router.post('/delete/:id', function (req, res) {});
module.exports = router;