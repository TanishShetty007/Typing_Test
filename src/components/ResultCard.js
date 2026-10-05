// ============================================================
// src/components/ResultCard.js — Post-Test Results Display
// ============================================================
// Shown after a typing test completes. Displays:
//   - WPM score
//   - Accuracy, correct/incorrect char counts, time used
//   - For code mode: an explanation of what the code does
//   - Buttons to try again or go to dashboard
//
// If the user is logged in, the result is automatically
// saved to the database by TypingTest.js before this renders.
// ============================================================

import React from 'react';

function ResultCard({ stats, onRestart, onViewStats, codeExplanation }) {
    // Determine a message based on WPM score
    const getMessage = () => {
        if (stats.wpm >= 100) return "🏆 Outstanding!";
        if (stats.wpm >= 80)  return "🔥 Excellent!";
        if (stats.wpm >= 60)  return "⚡ Great job!";
        if (stats.wpm >= 40)  return "👍 Good work!";
        return "💪 Keep practicing!";
    };

    // Color the WPM number based on speed
    const getWpmColor = () => {
        if (stats.wpm >= 80) return 'var(--accent)';
        if (stats.wpm >= 60) return '#8BC34A';   // green
        if (stats.wpm >= 40) return '#FF9800';   // orange
        return 'var(--error)';
    };

    return (
        <div className="fade-in" style={{
            textAlign: 'center',
            backgroundColor: 'var(--surface)',
            padding: '48px 40px',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 40px rgba(255, 193, 7, 0.08)'
        }}>
            {/* Congratulatory message */}
            <h2 style={{ fontSize: '1.75rem', color: 'var(--accent)', marginBottom: '8px' }}>
                {getMessage()}
            </h2>

            {/* Big WPM number */}
            <div style={{ margin: '24px 0' }}>
                <span style={{ fontSize: '5rem', fontWeight: 800, color: getWpmColor(), lineHeight: 1 }}>
                    {stats.wpm}
                </span>
                <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                    WPM
                </span>
            </div>

            {/* Stat row: Accuracy | Correct | Incorrect | Time */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '48px',
                padding: '24px 0',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                marginBottom: '24px'
            }}>
                <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stats.accuracy}%</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>Accuracy</div>
                </div>
                <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--success)' }}>{stats.correct}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>Correct</div>
                </div>
                <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--error)' }}>{stats.incorrect}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>Incorrect</div>
                </div>
                <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stats.time}s</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>Time</div>
                </div>
            </div>

            {/* ── Code Explanation Section ──────────────────────────────
                Only shown in code mode. Explains what the code does
                so the user learns something after every test!
            ──────────────────────────────────────────────────────── */}
            {codeExplanation && (
                <div style={{
                    backgroundColor: 'rgba(255, 193, 7, 0.08)',
                    border: '1px solid rgba(255, 193, 7, 0.25)',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    marginBottom: '24px',
                    textAlign: 'left'
                }}>
                    <div style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '10px'
                    }}>
                        💡 What this code does
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                        {codeExplanation}
                    </p>
                </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button className="btn btn-primary" onClick={onRestart}>
                    Try Again
                </button>
                <button
                    className="btn btn-ghost"
                    onClick={onViewStats}
                    style={{ border: '1px solid var(--border)' }}
                >
                    View Dashboard
                </button>
            </div>
        </div>
    );
}

export default ResultCard;
