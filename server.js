const express = require('express');
const mysql = require('mysql');

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Varsha1@",
    database: "var1"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database as id', db.threadId);
});

app.get("/register", (req, res) => {
    const sql = "SELECT * FROM register";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err.stack);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081...");
});
