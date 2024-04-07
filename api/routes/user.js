const express = require('express');
const { executeQuery } = require("../db");

const userRouter = express.Router();




userRouter.delete('/delete-account', (req, res) => {
    const { userId } = req.body;

    const deleteUserSql = 'DELETE FROM users WHERE id = ?;';
    executeQuery(deleteUserSql, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to delete account." });
            return;
        }
        res.json({ message: "Account successfully deleted." });
    });
});


module.exports = userRouter;