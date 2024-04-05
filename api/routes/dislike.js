const express = require('express');
const {executeQuery} = require("../db");

const dislikeRouter = express.Router();

/* Requests */

dislikeRouter.post('/createDislike', (req, res) => {
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
        res.sendStatus(400);
    }

    const newDislike = { post_id, user_id };

    const sql = 'INSERT INTO dislikes SET ?';

    executeQuery(sql, newDislike, (err, result) => {
        if (err) {
            res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});
dislikeRouter.delete('/deleteDislike', (req, res) => {
    const { post_id, user_id } = req.body;
    const sql = 'DELETE FROM dislikes d WHERE d.post_id = ? AND d.user_id = ?;';

    executeQuery(sql, [post_id, user_id], (err, result) => {
        if (err) {
            res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});



module.exports = dislikeRouter;