// ============================================================
// models/TestResult.js — MongoDB schema for a typing test result
// ============================================================
// Every time a user finishes a typing test, we save the result
// here so we can show their history on the Dashboard.
// ============================================================

const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    // Which user took this test? (references the User model)
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // The user's display name (cached here so leaderboard queries are fast)
    userName: {
        type: String,
        required: true
    },

    // Words-per-minute score
    wpm: {
        type: Number,
        required: true,
        min: 0
    },

    // Accuracy as a percentage (0–100)
    accuracy: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    // How long the test was in seconds (e.g. 15, 30, 60, 120)
    duration: {
        type: Number,
        required: true
    },

    // Test mode: 'words', 'quotes', or 'code'
    mode: {
        type: String,
        enum: ['words', 'quotes', 'code'],
        default: 'words'
    },

    // Difficulty level: 'easy', 'medium', or 'hard'
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },

    // For code mode — which programming language was used
    language: {
        type: String,
        default: null  // null means it wasn't a code test
    },

    // Number of characters typed correctly
    correctChars: { type: Number, default: 0 },

    // Number of characters typed incorrectly
    incorrectChars: { type: Number, default: 0 },

}, {
    timestamps: true  // adds createdAt (when the test was taken)
});

module.exports = mongoose.model('TestResult', testResultSchema);
