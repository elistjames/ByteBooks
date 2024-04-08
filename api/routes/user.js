const express = require('express');
const { executeQuery } = require("../db");

const userRouter = express.Router();




userRouter.delete('/deleteUser', (req, res) => {
    const { user_id } = req.body;

    const sql = 'DELETE FROM users WHERE id = ?;';
    executeQuery(sql, [user_id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to delete account." });
            return;
        }
        res.status(200).json({ message: "Account successfully deleted." });
    });
});

userRouter.get('/posts/:username', (req, res) => {
    const { username } = req.params;
    const sql = `
        SELECT 
            p.post_id,
            p.user_id,
            p.username,
            p.title,
            p.content,
            p.created_at,
            COUNT(DISTINCT l.like_id) AS num_likes,
            COUNT(DISTINCT d.like_id) AS num_dislikes,
            COUNT(DISTINCT c.comment_id) AS num_comments
        FROM 
            posts p
        LEFT JOIN 
            likes l ON p.post_id = l.post_id
        LEFT JOIN 
            dislikes d ON p.post_id = d.post_id
        LEFT JOIN 
            comments c ON p.post_id = c.post_id
        WHERE
            p.username = ?
        GROUP BY 
            p.post_id, p.title, p.content
        ORDER BY created_at DESC`;

    executeQuery(sql, [username], (err, results) => {
        if (err) {
            res.status(err.statusCode).json({ error: 'Failed to get posts' });
            throw err;
        }
        res.json(results);
    });
});


module.exports = userRouter;