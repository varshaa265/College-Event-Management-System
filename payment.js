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

// Route to handle payment registration
app.post('/payment', (req, res) => {
  const { payment_id, usn, name_on_card, card_type, card_number, expiry_month, expiry_year, cvv, event_id } = req.body;

  // Check if the provided USN exists in the register table
  db.query('SELECT * FROM register WHERE USN = ?', [usn], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // If the USN does not exist, return an error response
    if (results.length === 0) {
      
      res.status(400).json({ error: 'You must first register before making a payment' });
      return;
    }

    // Fetch the cost of the selected event from the database
    db.query("SELECT cost FROM events WHERE event_id = ?", [event_id], (err, eventResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (eventResult.length === 0) {
        return res.status(404).json({ error: "Event not found" });
      }

      const total_amount = eventResult[0].cost;

      // Insert payment details into the payment table
      db.query("INSERT INTO payment(payment_id, usn, name_on_card, card_type, card_number, expiry_month, expiry_year, cvv, event_id, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [payment_id, usn, name_on_card, card_type, card_number, expiry_month, expiry_year, cvv, event_id, total_amount], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Payment registered successfully");
        return res.status(200).json({ message: "Payment registered successfully", total_amount });
      });
    });
  });
});

// Route for testing purposes
app.get('/test', (req, res) => {
  return res.json("This is a test route");
});

// Start the server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
