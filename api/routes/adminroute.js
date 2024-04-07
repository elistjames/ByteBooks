const express = require('express');
const { executeQuery } = require("../db");

const adminRouter = express.Router();

adminRouter.get('/reportedUsers', (req, res) => {
    const sql = `
        SELECT u.id, u.username, COUNT(r.report_id) AS report_count
        FROM reports r
        JOIN users u ON r.reported_user_id = u.id
        GROUP BY u.id;
    `;

    executeQuery(sql, [], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to get reported users" });
            return;
        }
        res.json(result);
    });
});

adminRouter.get('/reportedPosts', (req, res) => {
    const sql = `
        SELECT p.post_id, p.title, u.username, COUNT(r.report_id) AS report_count
        FROM reports r
        JOIN posts p ON r.post_id = p.post_id
        JOIN users u ON p.user_id = u.id
        GROUP BY p.post_id;
    `;

    executeQuery(sql, [], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to get reported posts" });
            return;
        }
        res.json(result);
    });
});

adminRouter.delete('/user/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?;';

    executeQuery(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to delete user" });
            return;
        }
        res.json({ message: "User deleted successfully" });
    });
});

adminRouter.delete('/post/:postId', (req, res) => {
    const { postId } = req.params;
    const sql = 'DELETE FROM posts WHERE post_id = ?;';

    executeQuery(sql, [postId], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to delete post" });
            return;
        }
        res.json({ message: "Post deleted successfully" });
    });
});

module.exports = adminRouter;
