const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Varsha1@",
    database: "var1"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM events";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Error fetching data" });
        } else {
            res.json(result);
        }
    });
});

app.post("/api/post", (req, res) => {
    const { event_name, description, date, time, theme, cost } = req.body;
    const sqlInsert = "INSERT INTO events (event_name, description, date, time, theme, cost) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [event_name, description, date, time, theme, cost], (error, result) => {
        if (error) {
            console.error("Error inserting data:", error);
            res.status(500).json({ error: "Error inserting data" });
        } else {
            console.log("Data inserted successfully:", result);
            res.json({ message: "Data inserted successfully" });
        }
    });
});

app.delete("/api/remove/:event_id", (req, res) => {
    const { event_id } = req.params;
    const sqlRemove = "DELETE FROM events WHERE event_id=?";
    db.query(sqlRemove, [event_id], (error, result) => {
        if (error) {
            console.error("Error deleting data:", error);
            res.status(500).json({ error: "Error deleting data" });
        } else {
            console.log("Data deleted successfully:", result);
            res.json({ message: "Data deleted successfully" });
        }
    });
});

app.get("/api/get/:event_id", (req, res) => {
    const { event_id } = req.params;
    const sqlGet = "SELECT * FROM events WHERE event_id=?";
    db.query(sqlGet, [event_id], (error, result) => {
        if (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Error fetching data" });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: "Event not found" });
            } else {
                res.json(result[0]);
            }
        }
    });
});

app.put("/api/update/:event_id", (req, res) => {
    const { event_id } = req.params;
    const {  description, date, time, theme } = req.body;
    const sqlUpdate = "UPDATE events SET  description=?, date=?, time=?, theme=? WHERE event_id=?";
    db.query(sqlUpdate, [ description, date, time, theme,  event_id], (error, result) => {
        if (error) {
            console.error("Error updating data:", error);
            res.status(500).json({ error: "Error updating data" });
        } else {
            console.log("Data updated successfully:", result);
            res.json({ message: "Data updated successfully" });
        }
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
