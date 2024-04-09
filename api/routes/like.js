const express = require('express');
const {executeQuery} = require("../db");

const likeRouter = express.Router();

/* Requests */
likeRouter.post('/createLike', (req, res) => {
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
        res.status(400).json({ message: "post id and user not provided" });
    }

    const newLike = { post_id, user_id };

    const sql = 'INSERT INTO likes SET ?';

    executeQuery(sql, newLike, (err, result) => {
        if (err) {
            return;
        }
        res.status(200).json({ message: "Post has been liked" });
    });
});


likeRouter.delete('/deleteLike', (req, res) => {
    const { post_id, user_id } = req.body;
    const sql = 'DELETE FROM likes l WHERE l.post_id = ? AND l.user_id = ?;';

    executeQuery(sql, [post_id, user_id], (err, result) => {
        if (err) {
            return;
        }
        res.status(200).json({ message: "Like has been removed" });
    });
});


module.exports = likeRouter;