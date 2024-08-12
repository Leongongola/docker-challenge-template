const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

// Database connection setup
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

// Endpoint to list all books
app.get("/api/books", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM books");
    res.json(rows);
  } catch (err) {
    console.error("Error connecting to database:", err.message);
    res.status(500).send("Error connecting to the database");
  }
});

// Endpoint to get a book by ID
app.get("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM books WHERE id = ?",
      [bookId]
    );
    res.json(rows.length ? rows[0] : { error: "Book not found" });
  } catch (err) {
    console.error("Error connecting to database:", err.message);
    res.status(500).send("Error connecting to the database");
  }
});

app.listen(port, () => {
  console.log(`Node service running on port ${port}`);
});
