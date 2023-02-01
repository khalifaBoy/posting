const Posts = require('../models/posts');

//get posts handler
exports.getPosts = async (req, res, next) => {
    try {
        //fetch posts from database
        const posts = await (req.params.userId ? Posts.findAll({where: {userId: req.params.userId}}) : Posts.findAll());

        //if posts array is empty
        if(!posts[0]) {
            //throw an error
            const error = new Error('Resource Not Found');
            error.status = 404;
            throw error
        }

        //else send the posts
        res.status(200).send(posts);
    }
    catch(err) {
        //if still there is a error
        if(!err.status) {
            err.status = 500;
        }
        //move_on
        next(err);
    };
};
