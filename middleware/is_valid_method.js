module.exports = (req, res, next) => {
    //create a error generator
    const errorCreator = (status, message) => {
        const error = new Error(message);
        error.status= status;
        throw error;
    }


    //for /feed/posts
    //if method is not defined
    if(req.method!=='GET' && req.baseUrl==='/feed') {
        const message = `${req.method} is not allowed on ${req.originalUrl}. Consider trying GET!!`;
        errorCreator(501, message);
    }
    
    
    //for /user/<controllers>
    //if method is not defined
    let methods = ['POST', 'PUT', 'DELETE'], positionalRef = ['post', 'edit', 'delete'];
    if(req.baseUrl==='/user') {
        //extract [urlEnd]
        const currentEnd = req.originalUrl.split('/')[2];
        //get the position of currentEnd
        const position = positionalRef.indexOf(currentEnd);
        //set the appropriate method for the currentEnd
        const method = methods[position];

        if(methods.indexOf(req.method)===-1 || method!==req.method) {
            //throw error
            const message = `${req.method} is not allowed on ${req.originalUrl}. Consider trying ${method}!!`;
            errorCreator(501, message);
        }
        
        
    }


    
    //for /auth/<controllers>
    //if method is not defined
    methods = ['POST', 'PUT'], positionalRef = ['login', 'signup'];
    if(req.baseUrl==='/auth') {
        //extract [urlEnd]
        const currentEnd = req.originalUrl.split('/')[2];
        //get the position of currentEnd
        const position = positionalRef.indexOf(currentEnd);
        //set the appropriate method for the currentEnd
        const method = methods[position];

        
        if(methods.indexOf(req.method)===-1 || method!==req.method) {
            //throw error
            const message = `${req.method} is not allowed on ${req.originalUrl}. Consider trying ${method}!!`;
            errorCreator(501, message);
        }
        
    }

    //move_on
    next();
}