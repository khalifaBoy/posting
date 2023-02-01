const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');

// MODELS
const Posts = require('./models/posts');
const User = require('./models/user');

const feedRoute = require('./routes/feed');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();
//set PORT here
// const PORT = ;

//parse the req [application/json]
app.use(bodyParser.json());

//set headers [origins, methods, headers]
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


//ROUTES => validate methods
app.use('/feed', feedRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);

//when there is error
app.use((error, req, res, next) => {
    res.status(error.status).json({message: error.message, data: error.data});
})

Posts.belongsTo(User);
User.hasMany(Posts);

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
