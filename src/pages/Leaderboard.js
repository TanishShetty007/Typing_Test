// ============================================================
// src/pages/Leaderboard.js — Global Leaderboard Page
// ============================================================
// Shows the top typists ranked by their best WPM.
// All data comes from the real MongoDB database — no fake entries!
//
// Users can filter by time period:
//   Today | This Week | This Month | All Time
// ============================================================

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Map filter tab labels to the API query parameter values
const TABS = [
    { label: 'Today',      value: 'today'   },
    { label: 'This Week',  value: 'week'    },
    { label: 'This Month', value: 'month'   },
    { label: 'All Time',   value: 'alltime' },
];

// Medal emojis for top 3 places
const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' };

function Leaderboard() {
    const [activeTab, setActiveTab] = useState('alltime');
    const [data,      setData]      = useState([]);
    const [loading,   setLoading]   = useState(true);
    const [error,     setError]     = useState('');

    // Get the logged-in user so we can highlight "you" in the table
    const { user } = useAuth();

    // Fetch leaderboard whenever the active tab changes
    useEffect(() => {
        setLoading(true);
        setError('');

        api.getLeaderboard(activeTab)
            .then(rows => setData(rows))
            .catch(() => setError('Failed to load leaderboard. Is the backend running?'))
            .finally(() => setLoading(false));

    }, [activeTab]);

    return (
        <div className="container fade-in" style={{ padding: '40px 0', paddingBottom: '80px', maxWidth: '800px' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏆 Global Leaderboard</h2>
                <p style={{ color: 'var(--text-muted)' }}>
                    Real typists, real scores. Every result is saved from an actual test.
                </p>
            </div>

            {/* ── Tab Selector ──────────────────────────────────── */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
                {TABS.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        style={{
                            padding: '8px 18px',
                            borderRadius: '20px',
                            border: '1px solid',
                            borderColor: activeTab === tab.value ? 'var(--accent)' : 'var(--border)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            backgroundColor: activeTab === tab.value ? 'var(--accent)' : 'transparent',
                            color: activeTab === tab.value ? '#1a1200' : 'var(--text-secondary)',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ── Table ─────────────────────────────────────────── */}
            <div style={{
                backgroundColor: 'var(--surface)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                overflow: 'hidden'
            }}>

                {/* Loading State */}
                {loading && (
                    <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Loading leaderboard...
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div style={{ padding: '60px', textAlign: 'center', color: 'var(--error)' }}>
                        {error}
                    </div>
                )}

                {/* Empty State — no tests have been taken yet */}
                {!loading && !error && data.length === 0 && (
                    <div style={{ padding: '60px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⌨️</div>
                        <p style={{ color: 'var(--text-muted)' }}>
                            No results yet for this period. Be the first!
                        </p>
                    </div>
                )}

                {/* The actual leaderboard table */}
                {!loading && !error && data.length > 0 && (
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{
                                borderBottom: '1px solid var(--border)',
                                color: 'var(--text-muted)',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                <th style={{ padding: '14px 24px', fontWeight: 600, width: '12%' }}>Rank</th>
                                <th style={{ padding: '14px 24px', fontWeight: 600, width: '45%' }}>Typist</th>
                                <th style={{ padding: '14px 24px', fontWeight: 600, width: '20%' }}>Best WPM</th>
                                <th style={{ padding: '14px 24px', fontWeight: 600, width: '23%' }}>Avg Accuracy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => {
                                // Check if this row is the currently logged-in user
                                const isMe = user && row.userId === user.id;

                                return (
                                    <tr
                                        key={row.rank}
                                        style={{
                                            borderBottom: '1px solid var(--border)',
                                            // Highlight the logged-in user's row
                                            backgroundColor: isMe ? 'rgba(255, 193, 7, 0.08)' : 'transparent',
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        {/* Rank — show medal emoji for top 3 */}
                                        <td style={{
                                            padding: '18px 24px',
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            color: row.rank <= 3 ? 'var(--accent)' : 'var(--text-muted)'
                                        }}>
                                            {MEDALS[row.rank] || `#${row.rank}`}
                                        </td>

                                        {/* Name */}
                                        <td style={{
                                            padding: '18px 24px',
                                            fontWeight: isMe ? 700 : 500,
                                            color: isMe ? 'var(--accent)' : 'var(--text-primary)'
                                        }}>
                                            {row.userName}
                                            {/* Tag "(You)" next to the logged-in user */}
                                            {isMe && (
                                                <span style={{
                                                    marginLeft: '8px',
                                                    fontSize: '0.75rem',
                                                    padding: '2px 8px',
                                                    borderRadius: '10px',
                                                    backgroundColor: 'var(--accent-dim)',
                                                    color: 'var(--accent)',
                                                    fontWeight: 600
                                                }}>
                                                    You
                                                </span>
                                            )}
                                        </td>

                                        {/* Best WPM */}
                                        <td style={{ padding: '18px 24px', color: 'var(--accent)', fontWeight: 700, fontSize: '1.1rem' }}>
                                            {row.bestWpm}
                                        </td>

                                        {/* Average Accuracy */}
                                        <td style={{ padding: '18px 24px', color: 'var(--text-primary)' }}>
                                            {row.avgAccuracy}%
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Note about real data */}
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '20px' }}>
                Rankings update in real-time as users complete tests. Log in to appear on the board!
            </p>
        </div>
    );
}

export default Leaderboard;
