// ============================================================
// src/pages/Login.js — Login Page
// ============================================================
// Allows existing users to log in with their email and password.
// On success, saves the JWT token and redirects to home.
// ============================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Login() {
    // Form fields
    const [email,    setEmail]    = useState('');
    const [password, setPassword] = useState('');

    // UI state
    const [error,   setError]   = useState('');  // error message to display
    const [loading, setLoading] = useState(false); // disable button while submitting

    // Hooks
    const { login } = useAuth();   // function to update global auth state
    const navigate  = useNavigate(); // function to redirect to another page

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload on form submit
        setError('');        // clear any previous error
        setLoading(true);

        try {
            // Call the backend login API
            const data = await api.login(email, password);

            // Save the token and user info in AuthContext + localStorage
            login(data.token, data.user);

            // Redirect to home page
            navigate('/');

        } catch (err) {
            // Show the error message from the backend, or a generic one
            setError(err.response?.data?.error || 'Login failed. Please try again.');
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
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Welcome back</h2>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                        Continue improving your typing speed.
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

                {/* Login Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

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
                            placeholder="Your password"
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
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                {/* Link to register */}
                <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
