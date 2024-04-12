const express = require('express');
const {executeQuery} = require("../db");
const postRouter = express.Router();

/* Requests */

// request to get all posts, as well as the number of likes, dislikes, and comments on each post.
postRouter.get('/posts', (req, res) => {
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
            res.status(500).json({ message: "Failed to get posts" });
            return;
        }
        res.json(results);
    });
});


postRouter.get('/getPost', (req, res) => {
    const {postId, userId} = req.query;

    const sql = 'SELECT \n' +
        '    p.post_id,\n' +
        '    p.user_id,\n' +
        '    p.username,\n' +
        '    p.title,\n' +
        '    p.content,\n' +
        '    p.created_at,\n' +
        '    COUNT(DISTINCT l.like_id) AS num_likes,\n' +
        '    COUNT(DISTINCT d.like_id) AS num_dislikes,\n' +
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
        'WHERE p.post_id = ?\n' +
        'GROUP BY \n' +
        '    p.post_id, p.title, p.content;';

    executeQuery(sql, [userId, userId, postId], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Failed to get post" });
            return;
        }
        let post = results[0];
        const date = new Date(post.created_at);
        post.created_at = date.toLocaleDateString();
        res.json(post);
    });
});


postRouter.post('/createPost', (req, res) => {
    const { user_id, username, title, content } = req.body;
    const newPost = { user_id, username, title, content };
    const sql = 'INSERT INTO posts SET ?';
    executeQuery(sql, newPost, (err, result) => {
        if (err) {
            return;
        }
        res.status(200).json({ message: 'Post successfully created', id: result.insertId });
    });
});


postRouter.put('/updatePost', (req, res) => {
    const { post_id, title, content } = req.body;

    const sql = 'UPDATE posts\n' +
        'SET title = ?,\n' +
        '    content = ?\n' +
        'WHERE post_id = ?;';

    executeQuery(sql, [title, content, post_id], (err, result) => {
        if (err) {
            return;
        }
        res.status(200).json({ message: 'Post successfully updated', id: result.id });
    });
});


postRouter.delete('/deletePost', (req, res) => {
    const { post_id } = req.body;
    const sql = 'DELETE FROM posts p WHERE p.post_id = ?;';

    executeQuery(sql, post_id, (err, result) => {
        if (err) {
            return;
        }
        res.status(200).json({ message: 'Post successfully deleted', id: result.id });
    });
});

module.exports = postRouter;