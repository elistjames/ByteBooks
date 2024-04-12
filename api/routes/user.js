const express = require('express');
const { executeQuery } = require("../db");
const crypto = require('crypto');
const userRouter = express.Router();

userRouter.delete('/deleteUser', (req, res) => {
    const { user_id } = req.body;

    const sql = 'DELETE FROM users WHERE id = ?;';
    executeQuery(sql, [user_id], (err, result) => {
        if (err) {
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
        ORDER BY created_at DESC;`;

    executeQuery(sql, [username], (err, results) => {
        if (err) {
            return;
        }
        res.json(results);
    });
});

userRouter.put('/changePassword', (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    
    const hashedNewPassword = crypto.createHash('sha256').update(newPassword).digest('hex');

    if (crypto.createHash('sha256').update(oldPassword).digest('hex') === hashedNewPassword) {
        return res.status(200).json({ success: false, message: 'New password cannot be the same as the old password.' });
    }
    
    const sql = 'SELECT * FROM users WHERE id = ? AND password = ?';
    executeQuery(sql, [userId, crypto.createHash('sha256').update(oldPassword).digest('hex')], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to check old password.' });
        }
        if (results.length === 0) {
            return res.status(200).json({ success: false, message: 'Incorrect old password.' });
        }
        const updateUserSql = 'UPDATE users SET password = ? WHERE id = ?';
        executeQuery(updateUserSql, [hashedNewPassword, userId], (err, result) => {
            if (err) {
                return;
            }
            res.status(200).json({ success: true, message: 'Password updated successfully.' });
        });
    });
});

module.exports = userRouter;