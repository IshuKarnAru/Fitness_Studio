const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // You can choose your desired port number

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create an SQLite database connection (you should have SQLite installed)
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sessions.db');

// Define a route for booking a session
app.post('/book_session', (req, res) => {
  const { name, address, age, weight, gender, session_date } = req.body;

  // Insert the data into the database
  db.run(
    'INSERT INTO sessions (name, address, age, weight, gender, session_date) VALUES (?, ?, ?, ?, ?, ?)',
    [name, address, age, weight, gender, session_date],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while booking the session.');
      } else {
        res.send('Session booked successfully!');
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
