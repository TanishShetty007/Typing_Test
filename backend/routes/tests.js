// ============================================================
// routes/tests.js — Typing Test Results API Routes
// ============================================================
// POST /api/tests        → save a new test result (requires login)
// GET  /api/tests/my     → get the logged-in user's test history
// GET  /api/tests/stats  → get the user's overall stats summary
// ============================================================

const express = require('express');
const TestResult = require('../models/TestResult');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// All routes here require the user to be logged in
// We apply the authenticateToken middleware to all routes in this file
router.use(authenticateToken);

// ── SAVE TEST RESULT ─────────────────────────────────────────
// POST /api/tests
// Body: { wpm, accuracy, duration, mode, difficulty, language, correctChars, incorrectChars }
router.post('/', async (req, res) => {
    try {
        const { wpm, accuracy, duration, mode, difficulty, language, correctChars, incorrectChars } = req.body;

        // Validate required fields
        if (wpm === undefined || accuracy === undefined || !duration) {
            return res.status(400).json({ error: 'wpm, accuracy, and duration are required.' });
        }

        // Save the test result to the database
        const result = await TestResult.create({
            userId: req.user.id,       // from the JWT token
            userName: req.user.name,   // from the JWT token
            wpm,
            accuracy,
            duration,
            mode: mode || 'words',
            difficulty: difficulty || 'medium',
            language: language || null,
            correctChars: correctChars || 0,
            incorrectChars: incorrectChars || 0,
        });

        // Update the user's overall stats
        // Get all their tests to recalculate averages
        const allTests = await TestResult.find({ userId: req.user.id });
        const totalTests = allTests.length;
        const avgWpm = Math.round(allTests.reduce((sum, t) => sum + t.wpm, 0) / totalTests);
        const avgAccuracy = Math.round(allTests.reduce((sum, t) => sum + t.accuracy, 0) / totalTests);
        const bestWpm = Math.max(...allTests.map(t => t.wpm));

        // Update the user document with new stats
        await User.findByIdAndUpdate(req.user.id, {
            testsCompleted: totalTests,
            avgWpm,
            avgAccuracy,
            bestWpm
        });

        res.status(201).json({ message: 'Test result saved!', result });

    } catch (err) {
        console.error('Save test error:', err);
        res.status(500).json({ error: 'Failed to save test result.' });
    }
});

// ── GET MY TEST HISTORY ──────────────────────────────────────
// GET /api/tests/my?limit=20
// Returns the most recent tests for the logged-in user
router.get('/my', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;

        const tests = await TestResult.find({ userId: req.user.id })
            .sort({ createdAt: -1 }) // newest first
            .limit(limit);

        res.json(tests);

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch test history.' });
    }
});

// ── GET MY STATS SUMMARY ─────────────────────────────────────
// GET /api/tests/stats
// Returns best WPM, average WPM, average accuracy, and test count
router.get('/stats', async (req, res) => {
    try {
        // Use MongoDB's aggregation pipeline to calculate stats efficiently
        const stats = await TestResult.aggregate([
            { $match: { userId: require('mongoose').Types.ObjectId.createFromHexString(req.user.id) } },
            {
                $group: {
                    _id: null,
                    bestWpm: { $max: '$wpm' },
                    avgWpm: { $avg: '$wpm' },
                    avgAccuracy: { $avg: '$accuracy' },
                    totalTests: { $sum: 1 }
                }
            }
        ]);

        if (stats.length === 0) {
            // User hasn't taken any tests yet
            return res.json({ bestWpm: 0, avgWpm: 0, avgAccuracy: 0, totalTests: 0 });
        }

        const s = stats[0];
        res.json({
            bestWpm: s.bestWpm,
            avgWpm: Math.round(s.avgWpm),
            avgAccuracy: Math.round(s.avgAccuracy),
            totalTests: s.totalTests
        });

    } catch (err) {
        console.error('Stats error:', err);
        res.status(500).json({ error: 'Failed to fetch stats.' });
    }
});

module.exports = router;
