const { validationResult } = require('express-validator');

const Posts = require('../models/posts');


exports.createdPost = async (req, res, next) => {

    const errors = validationResult(req);
    //if errors are present
    if(!errors.isEmpty()) {
        //return to the client
        return res.status(400).json({
            errors: errors.array()
        })
    }

    //else
    try {
        //extract from body
        const {title, subject} = req.body;
        const userId = req.userId;
        //create a post
        const createdPost = await Posts.create({
            title, subject, userId
        })
        //send the newly created post to the client
        res.status(201).json(createdPost);
    }
    catch(err) {
        //if still there is a error
        if(!err.status) {
            err.status = 500;
        }
        //move_on
        next(err);
    }
};



exports.editPost = async (req, res, next) => {
    const errors = validationResult(req);
    //if errors are present
    if(!errors.isEmpty()) {
        //return to the client
        return res.status(400).json({
            errors: errors.array()
        })
    }

    //else
    try {
        //extract [postID, title, subject]
        const postId = req.params.postId;
        const {title, subject} = req.body;

        //find the post
        let aPost = await Posts.findByPk(postId);
        
        //if no such post is present
        if(!aPost) {
            //throw an error
            const error = new Error('Resource Not Found');
            error.status = 404;
            throw error;
        }

        //else update the post
        aPost.title = title;
        aPost.subject = subject;
        //save to database
        const updatedPost = await aPost.save();

        //send the updated post to the client
        res.status(200).json(updatedPost);

    } catch(err) {
        //if still there is a error
        if(!err.status) {
            err.status = 500;
        }
        //move_on
        next(err);
    }   
}


exports.deletePost = async (req, res, next) => {
    try {
        //extract [postId]
        const postId = req.params.postId;

        //find the post
        let aPost = await Posts.findByPk(postId);
        
        //if no such post is present
        if(!aPost) {
            const error = new Error('Resource Not Found');
            error.status = 404;
            throw error;
        }

        //else delete the post
        const deletedPost = await aPost.destroy();

        //send the deleted post to the client
        res.status(200).json(deletedPost);

    } catch(err) {
        //if still there is a error
        if(!err.status) {
            err.status = 500;
        }
        //move_on
        next(err);
    }
}