const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread'); // Import the thread model
const { authMiddleware } = require('../middleware/auth'); // Middleware for authentication

router.get('/threads', authMiddleware, async (req, res) => {
    try {
        const threads = await Thread.find({ userId: req.user._id });
        res.json(threads);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/threads', authMiddleware, async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const newThread = new Thread({
            title,
            userId: req.user._id
        });

        await newThread.save();
        res.status(201).json(newThread);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
