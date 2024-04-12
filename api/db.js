const mysql = require('mysql2');

// MySQL Connection Configuration
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'secret',
    database: 'app_db',
    port: 3307,
});

// Connect to Mysql db
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Function to execute a SQL query
function executeQuery(sql, params, callback) {
    // Check if params is a function (overloading without params)
    if (typeof params === 'function') {
        callback = params;
        params = []; // Set params to an empty array
    }
    db.query(sql, params, callback);
}

module.exports = {
    executeQuery
};