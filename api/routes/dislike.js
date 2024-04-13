const express = require('express');
const {executeQuery} = require("../db");
const dislikeRouter = express.Router();

/* Requests */

dislikeRouter.post('/createDislike', (req, res) => {
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
        res.status(400).json({ message: "post id and user not provided" });
    }

    const newDislike = { post_id, user_id };

    const sql = 'INSERT INTO dislikes SET ?';

    executeQuery(sql, newDislike, (err, result) => {
        if (err) {
            return;
        }
        res.status(200).json({ message: "Post has been disliked" });
    });
});

dislikeRouter.delete('/deleteDislike', (req, res) => {
    const { post_id, user_id } = req.body;
    const sql = 'DELETE FROM dislikes d WHERE d.post_id = ? AND d.user_id = ?;';

    executeQuery(sql, [post_id, user_id], (err, result) => {
        if (err) {
            return;
        }
        res.status(200).json({ message: "Dislike removed" });
    });
});



module.exports = dislikeRouter;