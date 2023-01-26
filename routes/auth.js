const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');

const User = require('../models/user');

const router = express.Router();


router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom( async (value) => {
        const [user] = await User.findAll({
            where: {
                email: value
            }
        })
        if(user!==undefined) return Promise.reject('E-mail already exits!');
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({min: 5})
    .withMessage('password must be 5 characters long.'),
    body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('name attribute can not be empty.')
], authController.signUp)


router.post('/login', authController.logIn)


module.exports = router;
