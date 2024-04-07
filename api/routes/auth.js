const express = require('express');
const { executeQuery } = require('../db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const authRouter = express.Router();

//key for verifying auth tokens
const jwtSecretKey = crypto.randomBytes(32).toString('hex');

/* Requests */

// API endpoint for user registration
authRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const newUser = { username, password: hashedPassword, permission: 'MEMBER' };
    
    const sql = 'INSERT INTO users SET ?';
    executeQuery(sql, newUser, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to register user" });
            return;
        }
        res.status(201).json({ message: 'User registered successfully', id: result.insertId });
    });
});

// API endpoint for user login
authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const sql = 'SELECT id, username, permission FROM users WHERE username = ? AND password = ?';
    executeQuery(sql, [username, hashedPassword], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Failed to authenticate" });
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            const token = jwt.sign({username, permission: user.permission, id: user.id}, jwtSecretKey);
            res.json({ token, permission: user.permission, id: user.id });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});



authRouter.get('/users', (req, res) => {

    const sql = 'SELECT * FROM users';
    executeQuery(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Failed to get users" });
            return;
        }
        res.json(results);
    });
});

// API endpoint for to check if a user exists
authRouter.get('/checkUserExists', (req, res) => {
    const { username } = req.query; // Assuming the username is sent as a query parameter

    if (!username) {
        return res.status(400).json({ error: 'Username query parameter is required' });
    }

    const sql = 'SELECT COUNT(username) AS count FROM users WHERE username = ?';
    executeQuery(sql, [username], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to query the database' });
            throw err;
        }
        const userExists = results[0].count > 0;
        res.json({ exists: userExists });
    });
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, jwtSecretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
}

module.exports = authRouter;

