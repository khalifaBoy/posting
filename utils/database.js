const Sequelize = require('sequelize');


const DB_config = ['<schema>', '<user>', '<password>'];


const sequelize = new Sequelize(...DB_config, {
    dialect: 'mysql',
    host: 'localhost'
})


module.exports = sequelize;