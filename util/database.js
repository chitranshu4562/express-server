// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '8677815614',
//     database: 'node-practice-db'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-practice-db', 'root', '8677815614', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;