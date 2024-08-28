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

// Route to fetch event cost based on event ID
app.get('/event-cost/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const sql = "SELECT cost FROM events WHERE event_id = ?";
    db.query(sql, [eventId], (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }
        const eventCost = data[0].cost;
        console.log("Event cost:", eventCost);
        return res.json({ cost: eventCost });
    });
});

// Route for testing purposes
app.get('/test', (req, res) => {
    return res.json("This is a test route");
});

app.listen(5556, () => {
    console.log("Server listening on port 5556");
});
