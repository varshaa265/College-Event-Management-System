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

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Define a route to execute the stored procedure and retrieve total revenue
app.get('/CalculateTotalRevenue1', (req, res) => {
  // Call the stored procedure to calculate total revenue
  db.query('CALL CalculateTotalRevenue1()', (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Retrieve the total revenue from the results
    const totalRevenue = results[0][0].TotalRevenue;
    
    // Send total revenue as JSON response
    res.json({ totalRevenue });
  });
});

// Start the Express server
const PORT = process.env.PORT || 7000; // Use the default port or specify a different one
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
