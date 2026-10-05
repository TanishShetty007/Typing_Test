// ============================================================
// middleware/auth.js — JWT Authentication Middleware
// ============================================================
// This middleware protects private routes.
// It checks if the request has a valid JWT token.
// If valid → pass the user info along and continue.
// If invalid/missing → reject with a 401 Unauthorized error.
// ============================================================

const jwt = require('jsonwebtoken');

// The secret key used to sign and verify tokens
// In production, store this in a .env file — NEVER in code!
const JWT_SECRET = process.env.JWT_SECRET || 'typecat_secret_key_change_in_production';

function authenticateToken(req, res, next) {
    // Tokens are sent in the "Authorization" header as:
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract just the token part

    // No token provided → reject the request
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Please log in.' });
    }

    // Verify the token is valid and not expired
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token is invalid or expired. Please log in again.' });
        }

        // Token is valid — attach the user's info to the request object
        // Now any route handler can access req.user.id, req.user.name, etc.
        req.user = decoded;
        next(); // Continue to the actual route handler
    });
}

module.exports = authenticateToken;
