
const mysql = require("mysql");
// const dbConfig = require("../config/db.config.js");

const dbConfig = {
    HOST: "localhost",
    USER: "blackboard",
    PASSWORD: "black@1q2w3e4r",
    DB: "blackboard_base"
};

// const dbConfig = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "",
//     DB: "blackboard_base"
// };



const connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

module.exports = connection;

