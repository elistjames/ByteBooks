const express = require('express');
const {executeQuery} = require("../db");

const commentRouter = express.Router();

/* Requests */
commentRouter.get('/getComments', (req, res) => {
    const { post_id } = req.query;

    const sql =
        'SELECT * FROM comments c ' +
        'WHERE c.post_id = ?' +
        'ORDER BY created_at desc;';

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

commentRouter.put('/updateComment', (req, res) => {
    const { comment_id, content } = req.body;

    const sql = 'UPDATE comments\n' +
        'SET content = ?\n' +
        'WHERE comment_id = ?;';

    executeQuery(sql, [content, comment_id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to update comment" });
            return;
        }
        res.status(200).json({ message: 'Comment successfully updated' });
    });
});

commentRouter.delete('/deleteComment', (req, res) => {
    const { comment_id } = req.body;

    if(!comment_id || comment_id == -1){
        res.status(500).json({ message: "comment id not provided" });
        return;
    }

    const sql = 'DELETE FROM comments c WHERE c.comment_id = ?;';

    executeQuery(sql, comment_id, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to delete comment" });
            return;
        }
        res.status(200).json({ message: 'Comment successfully deleted' });
    });
});

module.exports = commentRouter;