// ============================================================
// models/User.js — MongoDB schema for a user account
// ============================================================
// This defines the "shape" of a user document in our database.
// Mongoose uses this schema to validate and save data.
// ============================================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema (structure) of a user document
const userSchema = new mongoose.Schema({
    // The user's display name
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,           // removes extra spaces
        minlength: 2,
        maxlength: 30
    },

    // The user's email (must be unique, used to log in)
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,      // store email in lowercase
        trim: true
    },

    // The user's hashed password (we NEVER store the plain password)
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },

    // Best WPM this user has ever scored
    bestWpm: { type: Number, default: 0 },

    // Total number of typing tests completed
    testsCompleted: { type: Number, default: 0 },

    // Running average WPM across all tests
    avgWpm: { type: Number, default: 0 },

    // Running average accuracy across all tests
    avgAccuracy: { type: Number, default: 0 },

}, {
    timestamps: true  // automatically adds createdAt and updatedAt fields
});

// ── Pre-save Hook ────────────────────────────────────────────
// Before saving a user, hash their password automatically.
// "bcrypt" turns "mypassword123" into something like "$2b$10$..."
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been changed (or is new)
    if (!this.isModified('password')) return next();

    // Salt rounds = 10 means bcrypt runs the algorithm 2^10 = 1024 times
    // This makes brute-force attacks very slow
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ── Instance Method ─────────────────────────────────────────
// A helper method to compare a plain password with the stored hash
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the model
// "User" is the collection name → MongoDB will create a "users" collection
module.exports = mongoose.model('User', userSchema);
