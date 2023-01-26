const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const Posts = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    subject: Sequelize.STRING
});

module.exports = Posts;