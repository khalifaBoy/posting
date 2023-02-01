const Sequelize = require('sequelize');


//set data-configuration here
const DB_config = ['schema', 'user', 'mysql'];


const sequelize = new Sequelize(...DB_config, {
    dialect: 'mysql',
    host: 'localhost'
})


module.exports = sequelize;