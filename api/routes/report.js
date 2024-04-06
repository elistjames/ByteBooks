const express = require('express');
const {executeQuery} = require("../db");

const reportRouter = express.Router();


/* Requests */

reportRouter.post('/createReport', (req, res) => {
    const { user_id, reported_id, post_id, username, reason } = req.body;
    const newReport = {
        reporter_id: user_id,
        reported_user_id: reported_id,
        post_id: null,
        reporter_username: username,
        reason: reason
    };
    const sql = 'INSERT INTO reports SET ?;';

    executeQuery(sql, newReport, (err, result) => {
        if (err) {
            res.status(err.statusCode).json({ error: 'Failed to report post' });
            throw err;
        }
        res.status(200).json({ message: 'post reported', id: result.id });
    });
});


module.exports = reportRouter;