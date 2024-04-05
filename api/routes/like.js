const express = require('express');
const {executeQuery} = require("../db");

const likeRouter = express.Router();

/* Requests */
likeRouter.post('/createLike', (req, res) => {
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
        res.sendStatus(400);
    }

    const newLike = { post_id, user_id };

    const sql = 'INSERT INTO likes SET ?';

    executeQuery(sql, newLike, (err, result) => {
        if (err) {
            res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});


likeRouter.delete('/deleteLike', (req, res) => {
    const { post_id, user_id } = req.body;
    const sql = 'DELETE FROM likes l WHERE l.post_id = ? AND l.user_id = ?;';

    executeQuery(sql, [post_id, user_id], (err, result) => {
        if (err) {
            res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});


module.exports = likeRouter;