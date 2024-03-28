const express = require('express');
const db = require('../db');
const {executeQuery} = require("../db");

const mainPageRouter = express.Router();



/* Requests */


// request to get all posts, as well as the number of likes, dislikes, and comments on each post.
mainPageRouter.get('/posts', (req, res) => {

    const sql = 'SELECT \n' +
        '    p.post_id,\n' +
        '    p.title,\n' +
        '    p.content,\n' +
        '    COUNT(DISTINCT l.like_id) AS num_likes,\n' +
        '    COUNT(DISTINCT d.dislike_id) AS num_dislikes,\n' +
        '    COUNT(DISTINCT c.comment_id) AS num_comments\n' +
        'FROM \n' +
        '    posts p\n' +
        'LEFT JOIN \n' +
        '    likes l ON p.post_id = l.post_id\n' +
        'LEFT JOIN \n' +
        '    dislikes d ON p.post_id = d.post_id\n' +
        'LEFT JOIN \n' +
        '    comments c ON p.post_id = c.post_id\n' +
        'GROUP BY \n' +
        '    p.post_id, p.title, p.content';
    executeQuery(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to get posts' });
            throw err;
        }
        res.json(results);
    });
});

module.exports = mainPageRouter;