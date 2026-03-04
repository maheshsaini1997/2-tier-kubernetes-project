const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "testdb"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.get('/', (req, res) => {
  res.send("App is running 🚀");
});

app.get('/db', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});