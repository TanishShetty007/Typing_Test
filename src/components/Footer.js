// ============================================================
// src/components/Footer.js — Page Footer
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { Keyboard } from 'lucide-react';

function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            padding: '32px 0',
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
            }}>
                {/* Logo */}
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text-muted)',
                    textDecoration: 'none'
                }}>
                    <Keyboard size={18} color="var(--accent)" />
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>TypeCat</span>
                </Link>

                {/* Copyright */}
                <span>© {new Date().getFullYear()} TypeCat — Type faster. Think faster.</span>

                {/* Links */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link to="/test" style={{ color: 'var(--text-muted)' }}>Practice</Link>
                    <Link to="/leaderboard" style={{ color: 'var(--text-muted)' }}>Leaderboard</Link>
                    <Link to="/register" style={{ color: 'var(--text-muted)' }}>Sign Up</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
