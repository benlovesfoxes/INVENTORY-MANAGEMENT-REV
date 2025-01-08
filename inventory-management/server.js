const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Include CORS

const app = express();
const port = 5000;

// Initialize SQLite database
const db = new sqlite3.Database('./inventory.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  }
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Create table if it doesn't exist
db.run(
  'CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL, quantity INTEGER)',
  (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  }
);

// GET endpoint to fetch inventory
app.get('/api/inventory', (req, res) => {
  db.all('SELECT * FROM inventory', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST endpoint to add a new product
app.post('/api/inventory', (req, res) => {
  const { name, description, price, quantity } = req.body;

  const sql =
    'INSERT INTO inventory (name, description, price, quantity) VALUES (?, ?, ?, ?)';
  db.run(sql, [name, description, price, quantity], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      id: this.lastID,
      name,
      description,
      price,
      quantity,
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
