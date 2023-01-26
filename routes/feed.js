const express = require('express');

const router = express.Router();

//Route Controller
const feedController = require('../controllers/feed');


// ROUTES

//GET
router.get('/posts', feedController.getPosts);

module.exports = router;