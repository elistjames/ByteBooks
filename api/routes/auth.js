const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const router = express.Router();

//key for verifying auth tokens
const jwtSecretKey = crypto.randomBytes(32).toString('hex');

/* Requests */



module.exports = router;

