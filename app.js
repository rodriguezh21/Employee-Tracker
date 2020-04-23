const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 4040,
    user: "root",
    password: "password",
    database: "emp_trackerDB"
});