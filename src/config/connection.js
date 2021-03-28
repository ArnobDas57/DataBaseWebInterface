const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.SQLP,
    database: "plan_manager",
    multipleStatements: true
})

mysqlConnection.connect((err) => {
    if(!err) {
        console.log("Connected to MySQL");
    } else {
        console.log(err)
    }
})

module.exports = mysqlConnection;