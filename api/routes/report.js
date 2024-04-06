const express = require('express');
const {executeQuery} = require("../db");

const reportRouter = express.Router();


/* Requests */

reportRouter.get('/reports', (req, res) => {
   const sql = 'SELECT \n' +
       '    r.reported_user_id,\n' +
       '    r.post_id,\n' +
       '    p.title,\n' +
       '    u.username,\n' +
       '    COUNT(*) AS report_count\n' +
       'FROM \n' +
       '    reports r\n' +
       'LEFT JOIN \n' +
       '    posts p ON r.post_id = p.post_id\n' +
       'LEFT JOIN \n' +
       '    users u ON r.reported_user_id = u.id\n' +
       'GROUP BY \n' +
       '    r.report_id, r.reported_user_id, r.post_id, p.title, u.username;';

    executeQuery(sql, (err, result) => {
        if(err){
            res.status(500).json({ message: "Failed to get reports" });
            return;
        }
        res.json(result);
    });
});

reportRouter.get('/getPostReport', (req, res) => {
    const { userId, postId } = req.query;
    const sql = 'SELECT * FROM reports r WHERE r.reporter_id = ? AND r.post_id = ?;';

    executeQuery(sql, [userId, postId], (err, result) => {
        if(err){
            res.status(500).json({ message: "Failed to get post report" });
            return;
        }
        res.json(result);
    });

});

reportRouter.get('/getUserReport', (req, res) => {
    const { userId, reportedUserId } = req.query;
    const sql = 'SELECT * FROM reports r WHERE r.reporter_id = ? AND r.reported_user_id = ?;';

    executeQuery(sql, [userId, reportedUserId], (err, result) => {
        if(err){
            res.status(500).json({ message: "Failed to get user report" });
            return;
        }
        res.json(result);
    });

});

reportRouter.post('/createReport', (req, res) => {
    const { user_id, reported_id, post_id, username, reason } = req.body;
    const newReport = {
        reporter_id: user_id,
        reported_user_id: reported_id,
        post_id: post_id,
        reporter_username: username,
        reason: reason
    };
    const sql = 'INSERT INTO reports SET ?;';

    executeQuery(sql, newReport, (err, result) => {
        if(err){
            res.status(500).json({ message: "Failed to create report" });
            return;
        }
        res.status(200).json({ message: "report created", "id": result.id });
    });

});


module.exports = reportRouter;