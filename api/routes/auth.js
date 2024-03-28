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
    const newUser = { username, password };
    const sql = 'INSERT INTO users SET ?';
    executeQuery(sql, newUser, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to register user' });
            throw err;
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

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    executeQuery(sql, [username, password], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to authenticate' });
            throw err;
        }
        if (results.length > 0) {
            // User authenticated successfully, generate JWT
            const token = jwt.sign({ username }, jwtSecretKey);
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

authRouter.get('/users', (req, res) => {

    const sql = 'SELECT * FROM users';
    executeQuery(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to get users' });
            throw err;
        }
        res.json(results);
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

