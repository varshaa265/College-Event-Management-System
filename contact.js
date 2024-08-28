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

// Route to fetch event details from the events table based on event_id
app.get('/volunteers', (req, res) => {
  // Extract the event_id from the query parameters
  const { event_id } = req.query;
  
  let sql = 'SELECT usn, student_name, semester, phone, email, event_id, event_name FROM volunteers';

  // If event_id is provided, filter the results based on it
  if (event_id) {
    sql += ` WHERE event_id = '${event_id}'`;
  }

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 5040;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
