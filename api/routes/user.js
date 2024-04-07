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


module.exports = userRouter;