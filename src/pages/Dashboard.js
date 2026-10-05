// ============================================================
// src/pages/Dashboard.js — Personal Stats Dashboard
// ============================================================
// Shows the logged-in user's typing history and stats.
// All data is loaded from the Express backend (real MongoDB data).
//
// If the user is NOT logged in, shows a prompt to log in.
// ============================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Dashboard() {
    // The logged-in user from auth context
    const { user } = useAuth();

    // State for data fetched from the backend
    const [stats,      setStats]      = useState(null);  // { bestWpm, avgWpm, avgAccuracy, totalTests }
    const [history,    setHistory]    = useState([]);     // array of test results
    const [loading,    setLoading]    = useState(true);
    const [error,      setError]      = useState('');

    // Load data when the component mounts (if user is logged in)
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        // Fetch stats and test history at the same time (in parallel)
        Promise.all([
            api.getMyStats(),
            api.getMyTests(20)
        ])
            .then(([statsData, historyData]) => {
                setStats(statsData);
                setHistory(historyData);
            })
            .catch(() => setError('Failed to load your data. Is the backend running?'))
            .finally(() => setLoading(false));

    }, [user]);

    // ── Not Logged In ──────────────────────────────────────────
    if (!user) {
        return (
            <div className="container fade-in" style={{ padding: '80px 0', textAlign: 'center' }}>
                <div style={{
                    maxWidth: '480px',
                    margin: '0 auto',
                    padding: '48px',
                    backgroundColor: 'var(--surface)',
                    borderRadius: '16px',
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
                    <h2 style={{ marginBottom: '12px' }}>Dashboard Locked</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                        Log in or create an account to save your typing results and track your progress over time.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <Link to="/login"    className="btn btn-ghost" style={{ border: '1px solid var(--border)' }}>Log In</Link>
                        <Link to="/register" className="btn btn-primary">Create Account</Link>
                    </div>
                </div>
            </div>
        );
    }

    // ── Loading State ──────────────────────────────────────────
    if (loading) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading your stats...</div>
            </div>
        );
    }

    // ── Error State ────────────────────────────────────────────
    if (error) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <div style={{ color: 'var(--error)', fontSize: '1rem' }}>{error}</div>
            </div>
        );
    }

    // Prepare chart data: show the last 15 tests, oldest first
    const chartData = [...history]
        .reverse()
        .slice(0, 15)
        .map((t, i) => ({
            name: `#${i + 1}`,
            wpm: t.wpm,
            accuracy: t.accuracy
        }));

    // ── Full Dashboard ─────────────────────────────────────────
    return (
        <div className="container fade-in" style={{ padding: '40px 0', paddingBottom: '80px' }}>

            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '4px' }}>
                    Welcome back, <span style={{ color: 'var(--accent)' }}>{user.name}</span> 👋
                </h2>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                    Here's how your typing is improving over time.
                </p>
            </div>

            {/* ── Overview Stat Cards ─────────────────────────────── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                <StatCard label="Best WPM"           value={stats?.bestWpm || 0} suffix="wpm" />
                <StatCard label="Average WPM"        value={stats?.avgWpm || 0}  suffix="wpm" />
                <StatCard label="Average Accuracy"   value={`${stats?.avgAccuracy || 0}%`} />
                <StatCard label="Tests Completed"    value={stats?.totalTests || 0} suffix="tests" />
            </div>

            {/* ── Charts ─────────────────────────────────────────── */}
            {chartData.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>

                    {/* WPM over time */}
                    <div className="card">
                        <h3 style={{ marginBottom: '24px' }}>Typing Speed (WPM)</h3>
                        <div style={{ width: '100%', height: 260 }}>
                            <ResponsiveContainer>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                    <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                                        itemStyle={{ color: 'var(--accent)' }}
                                    />
                                    <Line type="monotone" dataKey="wpm" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, fill: 'var(--accent)' }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Accuracy over time */}
                    <div className="card">
                        <h3 style={{ marginBottom: '24px' }}>Accuracy (%)</h3>
                        <div style={{ width: '100%', height: 260 }}>
                            <ResponsiveContainer>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                    <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis domain={[60, 100]} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                                        itemStyle={{ color: 'var(--success)' }}
                                    />
                                    <Line type="monotone" dataKey="accuracy" stroke="var(--success)" strokeWidth={3} dot={{ r: 4, fill: 'var(--success)' }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                // No tests taken yet
                <div className="card" style={{ textAlign: 'center', padding: '48px', marginBottom: '40px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⌨️</div>
                    <h3 style={{ marginBottom: '12px' }}>No tests yet!</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                        Take your first typing test to start tracking your progress.
                    </p>
                    <Link to="/test" className="btn btn-primary">Start Typing</Link>
                </div>
            )}

            {/* ── Recent Tests Table ──────────────────────────────── */}
            {history.length > 0 && (
                <div className="card">
                    <h3 style={{ marginBottom: '24px' }}>Recent Tests</h3>
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Date</th>
                                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Mode</th>
                                <th style={{ padding: '12px 8px', fontWeight: 600 }}>WPM</th>
                                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Accuracy</th>
                                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((t, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                                    {/* Format the date nicely */}
                                    <td style={{ padding: '14px 8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        {new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </td>
                                    {/* Show mode, with language for code tests */}
                                    <td style={{ padding: '14px 8px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                                        {t.mode === 'code' && t.language ? `${t.language} code` : t.mode}
                                    </td>
                                    <td style={{ padding: '14px 8px', color: 'var(--accent)', fontWeight: 700 }}>
                                        {t.wpm}
                                    </td>
                                    <td style={{ padding: '14px 8px', color: 'var(--text-primary)' }}>
                                        {t.accuracy}%
                                    </td>
                                    <td style={{ padding: '14px 8px', color: 'var(--text-muted)' }}>
                                        {t.duration}s
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// ── Helper: Stat Card ─────────────────────────────────────────
function StatCard({ label, value, suffix }) {
    return (
        <div className="card">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '8px' }}>
                {label}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)' }}>{value}</span>
                {suffix && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{suffix}</span>}
            </div>
        </div>
    );
}

export default Dashboard;
