// Import Required Modules
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

// Connect to SQLite Database
const db = new sqlite3.Database(process.env.SQLITE_DB_PATH, (err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to SQLite Database.');
});

module.exports = db;