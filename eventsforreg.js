const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Varsha1@",
    database: "var1"
});

// Route to fetch all data from the register table
app.get('/events', (req, res) => {
    const sql = "SELECT event_id, event_name,cost FROM events";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Data retrieved from database:", data);
        return res.json(data);
    });
});

// Route for testing purposes
app.get('/test', (req, res) => {
    return res.json("This is a test route");
});

app.listen(5010, () => {
    console.log("Server listening on port 5010");
});
