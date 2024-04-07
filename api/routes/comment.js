const express = require('express');
const {executeQuery} = require("../db");

const commentRouter = express.Router();

/* Requests */
commentRouter.get('/getComments', (req, res) => {
    const { post_id } = req.query;

    const sql = 'SELECT * FROM comments c WHERE c.post_id = ?';

    executeQuery(sql, post_id, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to get comments from database" });
            return;
        }
        res.json(result);
    });
});

commentRouter.post('/createComment', (req, res) => {
    const { post_id, user_id, username, content } = req.body;

    const newComment = { post_id, user_id,  username, content };

    const sql = 'INSERT INTO comments SET ?;';

    executeQuery(sql, newComment, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to create comment" });
            return;
        }
        res.status(200).json({ message: 'Comment successfully created', id: result.insertId });
    });
});

module.exports = commentRouter;