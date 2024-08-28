const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Varsha1@",
  database: "var1"
});

app.post('/register', (req, res) => {
  const { Name, USN, Mobile, Email, DOB, Sem } = req.body; // Ensure EventId is received in the request body
  db.query("INSERT INTO register(Name, USN, Mobile, Email, DOB, Sem) VALUES (?, ?, ?, ?, ?, ?)", [Name, USN, Mobile, Email, DOB, Sem], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("Registration successful");
    return res.status(200).json({ message: "Registration successful" });
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
