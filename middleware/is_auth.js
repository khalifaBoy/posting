// a common authorization middleware for user authorization


const jwt = require('jsonwebtoken');

//set token here
// const original_token = ;

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');
    //if the authorization header is undefined
    if(!authHeader) {
        const error = new Error('No Authorization is present');
        error.status = 401;
        throw error;
    }
    //else split and extract [token]
    const token = authHeader.split(' ')[1];
    let decodedToken;
    //decode token
    try {
        decodedToken = jwt.verify(token, original_token);
    } catch (error) {
        //if a error occurs [invalid, expired]
        error.status = 500;
        throw error;
    }
    
    //if the token the matches but still fails
    if(!decodedToken) {
        const error = new Error('Not authorized');
        error.status = 402;
        throw error;
    }
    
    //store the userID from decoded token to make use later
    req.userId = decodedToken.userId;
    //move_on
    next();
}