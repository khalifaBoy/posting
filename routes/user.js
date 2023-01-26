const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const is_auth = require('../middleware/is_auth');
const { body } = require('express-validator');



// ROUTES

//POST => Authorized => Validated
router.post('/post', is_auth, [
    body('title')
    .trim()
    .isLength({min: 5})
    .withMessage('title must be of 5 characters'),
    body('subject')
    .trim()
    .isLength({min: 5})
    .withMessage('subject must be of 5 characters')
], userController.createdPost)


//PUT => Authorized => Validated
router.put('/edit/:postId', is_auth, [
    body('title')
    .trim()
    .isLength({min: 5})
    .withMessage('title must be of 5 characters'),
    body('subject')
    .trim()
    .isLength({min: 5})
    .withMessage('subject must be of 5 characters')
], userController.editPost);


//DELETE => Authorized
router.delete('/delete/:postId', is_auth, userController.deletePost);

module.exports = router;