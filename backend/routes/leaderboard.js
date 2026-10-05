// ============================================================
// routes/leaderboard.js — Leaderboard API Route
// ============================================================
// GET /api/leaderboard?filter=alltime|today|week|month
// Returns the top 50 real users ranked by their best WPM.
// No fake data — every entry is a real user from the database!
// ============================================================

const express = require('express');
const TestResult = require('../models/TestResult');

const router = express.Router();

// ── GET LEADERBOARD ──────────────────────────────────────────
// GET /api/leaderboard?filter=alltime
router.get('/', async (req, res) => {
    try {
        const filter = req.query.filter || 'alltime';

        // Build a date filter based on the query parameter
        let dateFilter = {};
        const now = new Date();

        if (filter === 'today') {
            // Start of today at midnight
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            dateFilter = { createdAt: { $gte: startOfDay } };

        } else if (filter === 'week') {
            // 7 days ago
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            dateFilter = { createdAt: { $gte: weekAgo } };

        } else if (filter === 'month') {
            // 30 days ago
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            dateFilter = { createdAt: { $gte: monthAgo } };

        }
        // 'alltime' has no date filter — include all records

        // Use MongoDB aggregation to find each user's best WPM in the time period
        const leaderboard = await TestResult.aggregate([
            // Step 1: Apply date filter (or no filter for all-time)
            { $match: dateFilter },

            // Step 2: Group by user — keep their best WPM and average accuracy
            {
                $group: {
                    _id: '$userId',
                    userName: { $first: '$userName' },
                    bestWpm: { $max: '$wpm' },
                    avgAccuracy: { $avg: '$accuracy' },
                    testsInPeriod: { $sum: 1 }
                }
            },

            // Step 3: Sort by best WPM (highest first)
            { $sort: { bestWpm: -1 } },

            // Step 4: Only show the top 50 users
            { $limit: 50 },

            // Step 5: Add a rank field (1, 2, 3, ...)
            // We'll add rank in JavaScript since MongoDB doesn't have a simple $rank for aggregation
        ]);

        // Add rank numbers to each entry
        const ranked = leaderboard.map((entry, index) => ({
            rank: index + 1,
            userId: entry._id,
            userName: entry.userName,
            bestWpm: entry.bestWpm,
            avgAccuracy: Math.round(entry.avgAccuracy),
            testsInPeriod: entry.testsInPeriod
        }));

        res.json(ranked);

    } catch (err) {
        console.error('Leaderboard error:', err);
        res.status(500).json({ error: 'Failed to fetch leaderboard.' });
    }
});

module.exports = router;
