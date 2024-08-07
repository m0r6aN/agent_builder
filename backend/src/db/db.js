const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to your SQLite database file
const dbPath = path.resolve(__dirname, 'synthetiq.db');

// Create a new database file or open an existing one
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    createTables();
  }
});

// Function to create all the necessary tables
const createTables = () => {
  db.serialize(() => {
    // Run the SQL commands from schema.sql
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const schema = require('fs').readFileSync(schemaPath, 'utf8');
    db.exec(schema, (err) => {
      if (err) {
        console.error('Error executing schema', err.message);
      } else {
        console.log('Database schema created successfully.');
      }
    });
  });
};

// Handle graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database connection', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

module.exports = db;