// ============================================================
// src/pages/Register.js — Registration Page
// ============================================================
// Allows new users to create an account.
// After successful registration, they are automatically
// logged in (the backend returns a JWT token right away).
// ============================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Register() {
    // Form fields
    const [name,            setName]            = useState('');
    const [email,           setEmail]           = useState('');
    const [password,        setPassword]        = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // UI state
    const [error,   setError]   = useState('');
    const [loading, setLoading] = useState(false);

    // Hooks
    const { login } = useAuth();
    const navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Client-side validation before sending to backend
        if (password !== confirmPassword) {
            return setError('Passwords do not match.');
        }
        if (password.length < 6) {
            return setError('Password must be at least 6 characters.');
        }

        setLoading(true);

        try {
            // Call the backend register API
            const data = await api.register(name, email, password);

            // Auto-login: save the token and user info
            login(data.token, data.user);

            // Redirect to home page
            navigate('/');

        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container fade-in" style={{ padding: '60px 0', maxWidth: '440px' }}>
            <div style={{
                padding: '40px',
                backgroundColor: 'var(--surface)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                        Join TypeCat and start tracking your progress.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        padding: '12px 16px',
                        backgroundColor: 'rgba(255, 87, 34, 0.1)',
                        border: '1px solid rgba(255, 87, 34, 0.3)',
                        borderRadius: '8px',
                        color: 'var(--error)',
                        fontSize: '0.9rem',
                        marginBottom: '20px'
                    }}>
                        {error}
                    </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                    {/* Name Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Name
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your display name"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Email
                        </label>
                        <input
                            className="form-input"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Password
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Confirm Password
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Repeat your password"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading}
                        style={{ padding: '14px', fontSize: '1rem', marginTop: '8px', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                {/* Link to login */}
                <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
