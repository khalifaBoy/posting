const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const original_token = 'secret';


exports.signUp = async (req, res, next) => {
    const errors = validationResult(req);
    //if errors are present
    if(!errors.isEmpty()) {
        //return to the client
        res.status(400).json({
            errors: errors.array()
        })
    }

    //else
    try {
        //extract [user]
        const {name, email} = req.body;
        //hash the password
        const hashPw =  await bcrypt.hash(user.password, 4);
        //create a new user
        const newUser = await User.create({name, email, password: hashPw});
        //return the newly created user
        res.status(201).json({message: 'User Created', id: newUser.id});
    }
    catch(err) {
        //if still there is a error
        if(!err.status) {
            err.status = 500;
        }
        //move on
        next(err);
    }
}


exports.logIn = async (req, res, next) => {
    try {
        //extract [email, password]
        const {email, password} = req.body;
        //find the user
        const [aValidUser] = await User.findAll({
            where: {
                email: email
            }
        })
        //if not a valid user
        if(!aValidUser) {
            //throw an email exception
            const error = new Error('Please enter a valid email');
            error.status = 401;
            throw error;
        }

        //else
        const loadedUser = aValidUser;
        //compare the passwords [password = hashPw]
        const equal = await bcrypt.compare(password, loadedUser.password);
        //if passwords are not same
        if(!equal) {
            //throw an password exception
            const error = new Error('Please enter a valid password');
            error.status = 401;
            throw error;
        }

        //else create a token [1hr]
        const token = jwt.sign({
            email: loadedUser.email,
            d: loadedUser.id
        }, original_token, {expiresIn: '1h'});
        //send the token for authorization to the client
        res.status(200).json({token, userId: loadedUser.id});
    } 

    //if still there is a error
    catch(err) {
        if(!err.status) {
            err.status = 500;
        }

        //move on
        next(err);
    }
}