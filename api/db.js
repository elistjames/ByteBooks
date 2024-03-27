const mysql = require('mysql');

// MySQL Connection Configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'app_db'
});

// Connect to Mysql db
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;