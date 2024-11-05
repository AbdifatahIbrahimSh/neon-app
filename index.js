// Import necessary modules
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(express.json());

// Set up a connection pool to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // For Neon, if SSL is required
});

// Example route to fetch all posts
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT title, content FROM posts');
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).send('Error retrieving posts');
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
