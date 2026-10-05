// ============================================================
// src/pages/NotFound.js — 404 Page
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="container fade-in" style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⌨️</div>
            <h1 style={{ fontSize: '6rem', color: 'var(--accent)', fontWeight: 800, marginBottom: '0' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                Page not found
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                Looks like you took a wrong turn. Let's get you back on track.
            </p>
            <Link to="/" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                Go Home
            </Link>
        </div>
    );
}

export default NotFound;
