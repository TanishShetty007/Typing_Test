// ============================================================
// routes/auth.js — Register & Login API Routes
// ============================================================
// POST /api/auth/register  → create a new account
// POST /api/auth/login     → log in and receive a JWT token
// GET  /api/auth/me        → get the currently logged-in user's info
// ============================================================

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'typecat_secret_key_change_in_production';

// Helper: create a JWT token for a user
// The token expires in 7 days — after that, the user must log in again
function createToken(user) {
    return jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
}

// ── REGISTER ─────────────────────────────────────────────────
// POST /api/auth/register
// Body: { name, email, password }
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation — make sure all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters.' });
        }

        // Check if someone already registered with this email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'An account with this email already exists.' });
        }

        // Create the new user (the password gets hashed automatically via the pre-save hook in User.js)
        const user = await User.create({ name, email, password });

        // Create a JWT token so the user is immediately logged in after registering
        const token = createToken(user);

        res.status(201).json({
            message: 'Account created successfully!',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// ── LOGIN ────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'No account found with this email.' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password.' });
        }

        // Create a JWT token and send it back
        const token = createToken(user);

        res.json({
            message: 'Logged in successfully!',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// ── GET CURRENT USER ─────────────────────────────────────────
// GET /api/auth/me
// Requires: Authorization: Bearer <token>
router.get('/me', authenticateToken, async (req, res) => {
    try {
        // req.user.id was set by our auth middleware
        const user = await User.findById(req.user.id).select('-password'); // exclude the password field
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
});

module.exports = router;
