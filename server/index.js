const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const db = new sqlite3.Database("./server/db.sqlite");

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      role TEXT
    )
  `);

  // Sample data (runs once)
  db.run(`
    INSERT INTO players (name, role)
    SELECT 'Virat Kohli', 'Batsman'
    WHERE NOT EXISTS (SELECT 1 FROM players)
  `);
});

// API endpoint
app.get("/api/players", (req, res) => {
  db.all("SELECT * FROM players", (err, rows) => {
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
