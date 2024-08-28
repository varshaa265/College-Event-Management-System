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

// Helper function to query the database
function queryAsync(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Route to fetch all data from the register table and determine the status
app.get('/register', async (req, res) => {
    try {
        // Fetch data from the register table
        const registerData = await queryAsync("SELECT * FROM register");

        // Fetch data from the payment table
        const paymentData = await queryAsync("SELECT * FROM payment");

        // Fetch data from the events table
        const eventData = await queryAsync("SELECT * FROM events");

        // Map over the registerData and add the status field based on USN presence in paymentData and total amount
        const studentsWithStatus = registerData.map(register => {
            const isPaid = paymentData.some(payment => payment.usn === register.USN);
            const paymentDetails = paymentData.find(payment => payment.usn === register.USN);
            
            if (isPaid && paymentDetails) {
                // If USN is present in paymentData and paymentDetails is defined,
                // set the event_id to the value from paymentDetails
                return { ...register, status: "Paid", event_id: paymentDetails.event_id };
            } else if (!isPaid && !paymentDetails) {
                // If USN is present in paymentData but paymentDetails is undefined,
                // set a default value for event_id (e.g., "Pending Payment")
                return { ...register, status: "Not Paid", event_id: "N/A" };
            } else{
                // If USN is not present in paymentData, set status to "Not Paid"
                // Check if the event corresponding to the event ID exists in the events table
                const event = eventData.find(event => event.event_id === register.event_id);
                if (!event) {
                    // If event is not found, set the status to "Event Cancelled" and event_id to "N/A"
                    return { ...register,status:"Event Cancelled",event_id: "Event Cancelled" };
                } else {
                    // If event is found, set the event_id to the actual event name or other relevant information
                    // For example: return { ...register, status: "Not Paid", event_id: event.event_name };
                    return { ...register, status: "Not Paid", event_id: event.event_id };
                }
            }
        });

        console.log("Students with status:", studentsWithStatus);
        return res.json(studentsWithStatus);
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Route for testing purposes
app.get('/test', (req, res) => {
    return res.json("This is a test route");
});

app.listen(3002, () => {
    console.log("Server listening on port 3002");
});

