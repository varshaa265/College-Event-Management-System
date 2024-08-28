const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Varsha1@',
  database: 'var1'
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to fetch event details from the events table
app.get('/events', (req, res) => {
  const sql = 'SELECT event_id, event_name, description, date, time, theme, cost FROM events';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 3010;
app.listen(3010, () => {
  console.log("Server running on port 3010");
});
