const express = require('express');
const {executeQuery} = require("../db");

const mainPageRouter = express.Router();



/* Requests */


// request to get all posts, as well as the number of likes, dislikes, and comments on each post.
mainPageRouter.get('/posts', (req, res) => {
    const { userId } = req.query;
    const sql = 'SELECT \n' +
        '    p.post_id,\n' +
        '    p.user_id,\n' +
        '    p.username,\n' +
        '    p.title,\n' +
        '    p.content,\n' +
        '    p.created_at,\n' +
        '    COUNT(DISTINCT l.like_id) AS num_likes,\n' +
        '    COUNT(DISTINCT d.like_id) AS num_dislikes,\n' +
        '    COUNT(DISTINCT c.comment_id) AS num_comments,\n' +
        '    CASE WHEN EXISTS (\n' +
        '        SELECT 1 FROM likes l WHERE l.post_id = p.post_id AND l.user_id = ?\n' +
        '    ) THEN TRUE ELSE FALSE END AS liked_by_user,\n' +
        '    CASE WHEN EXISTS (\n' +
        '        SELECT 1 FROM dislikes d WHERE d.post_id = p.post_id AND d.user_id = ?\n' +
        '    ) THEN TRUE ELSE FALSE END AS disliked_by_user\n' +
        'FROM \n' +
        '    posts p\n' +
        'LEFT JOIN \n' +
        '    likes l ON p.post_id = l.post_id\n' +
        'LEFT JOIN \n' +
        '    dislikes d ON p.post_id = d.post_id\n' +
        'LEFT JOIN \n' +
        '    comments c ON p.post_id = c.post_id\n' +
        'GROUP BY \n' +
        '    p.post_id, p.title, p.content\n' +
        'ORDER BY created_at desc;';
    executeQuery(sql, [userId, userId], (err, results) => {
        if (err) {
            res.status(err.statusCode).json({ error: 'Failed to get posts' });
            throw err;
        }
        res.json(results);
    });
});


mainPageRouter.post('/createPost', (req, res) => {
    const { user_id, username, title, content } = req.body;
    const newPost = { user_id, username, title, content };
    const sql = 'INSERT INTO posts SET ?';
    executeQuery(sql, newPost, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create post' });
            throw err;
        }
        res.status(201).json({ message: 'Post successfully created', id: result.insertId });
    });
});


mainPageRouter.post('/updatePost', (req, res) => {

});


mainPageRouter.delete('/deletePost', (req, res) => {
    const { post_id } = req.body;
    const sql = 'DELETE FROM posts p WHERE p.post_id = ?;';

    executeQuery(sql, post_id, (err, result) => {
        if (err) {
            res.status(err.statusCode).json({ error: 'Failed to delete post' });
            throw err;
        }
        res.status(201).json({ message: 'Post successfully deleted', id: result.id });
    });
});

module.exports = mainPageRouter;