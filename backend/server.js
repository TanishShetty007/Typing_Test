// ============================================================
// server.js — Main entry point for the Express backend
// ============================================================
// This file sets up the Express server, connects to MongoDB,
// and wires up all the API route handlers.
// ============================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import our route files
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/tests');
const leaderboardRoutes = require('./routes/leaderboard');
const passageRoutes = require('./routes/passages');

// Create the Express app
const app = express();

// ── Middleware ──────────────────────────────────────────────
// Allow requests from our React frontend (port 3000)
app.use(cors({ origin: 'http://localhost:3000' }));

// Parse incoming JSON request bodies
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth', authRoutes);         // /api/auth/register, /api/auth/login
app.use('/api/tests', testRoutes);        // /api/tests (save & fetch test results)
app.use('/api/leaderboard', leaderboardRoutes); // /api/leaderboard
app.use('/api/passages', passageRoutes);  // /api/passages (fetch random typing texts)

// ── Health Check ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'TypeCat API is running!' });
});

// ── Connect to MongoDB & Start Server ───────────────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/typecat';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });
