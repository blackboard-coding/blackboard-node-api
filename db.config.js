
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "MjsfNIjOLFMQiVGy",
    DB: "blackboard"
};


const connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

module.exports = connection;

