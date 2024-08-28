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
    const sqlGet = "SELECT * FROM volunteers";
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
    const { usn, student_name, semester,phone,email, event_id, event_name } = req.body;
    const sqlInsert = "INSERT INTO volunteers (usn, student_name, semester, phone,email, event_id, event_name) VALUES (?, ?, ?, ?, ?,?,?)";
    db.query(sqlInsert, [usn, student_name, semester, phone,email, event_id, event_name], (error, result) => {
        if (error) {
            console.error("Error inserting data:", error);
            res.status(500).json({ error: "Error inserting data" });
        } else {
            console.log("Data inserted successfully:", result);
            res.json({ message: "Data inserted successfully" });
        }
    });
});

app.delete("/api/remove/:usn", (req, res) => {
    const { usn } = req.params;
    const sqlRemove = "DELETE FROM volunteers WHERE usn=?";
    db.query(sqlRemove, [usn], (error, result) => {
        if (error) {
            console.error("Error deleting data:", error);
            res.status(500).json({ error: "Error deleting data" });
        } else {
            console.log("Data deleted successfully:", result);
            res.json({ message: "Data deleted successfully" });
        }
    });
});

app.get("/api/get/:usn", (req, res) => {
    const { usn } = req.params;
    const sqlGet = "SELECT * FROM volunteers WHERE usn=?";
    db.query(sqlGet, [usn], (error, result) => {
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

app.put("/api/update/:usn", (req, res) => {
    const { usn } = req.params; // Use the original parameter name
    const { student_name, semester,phone,email, event_id, event_name } = req.body;
    const sqlUpdate = "UPDATE volunteers SET student_name=?, semester=?,phone=?,email=?, event_id=?, event_name=? WHERE usn=?";
    db.query(sqlUpdate, [student_name, semester,phone,email, event_id, event_name, usn], (error, result) => {
        if (error) {
            console.error("Error updating data:", error);
            res.status(500).json({ error: "Error updating data" });
        } else {
            console.log("Data updated successfully:", result);
            res.json({ message: "Data updated successfully" });
        }
    });
});

app.listen(5030, () => {
    console.log("Server is running on port 5030");
});
