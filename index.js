const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');

// MODELS
const Posts = require('./models/posts')
const User = require('./models/user')
const is_valid_method = require('./middleware/is_valid_method');

const feedRoute = require('./routes/feed');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8080;

//parse the req [application/json]
app.use(bodyParser.json());

//set headers [origins, methods, headers]
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


//ROUTES => validate methods
app.use('/feed', is_valid_method, feedRoute);
app.use('/auth', is_valid_method, authRoute);
app.use('/user', is_valid_method, userRoute);

//when there is error
app.use((error, req, res, next) => {
    res.status(error.status).json({message: error.message, data: error.data});
})



//connect to the database
sequelize.sync()
.then((result) => {
    //if connected
    /*console.log(result)*/
    //start listening at [PORT]
    app.listen(PORT);
})
//else log the error
.catch(err => console.log(err));
