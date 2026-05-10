const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "srujal",
    database: "digital_memory_capsule"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed", err);
    } else {
        console.log("MySQL Connected");
    }
});

module.exports = db;