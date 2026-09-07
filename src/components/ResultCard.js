import React from 'react';

function ResultCard({ stats, onRestart, onViewStats }) {
    return (
        <div style={{ textAlign: 'center', backgroundColor: 'var(--surface)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--success)' }}>Great job!</h2>
            <h1 style={{ fontSize: '4rem', margin: '20px 0', color: 'var(--text-primary)' }}>{stats.wpm} <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>WPM</span></h1>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '30px 0' }}>
                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.accuracy}%</span>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Accuracy</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{stats.correct}</span>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Correct</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--error)' }}>{stats.incorrect}</span>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Incorrect</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.time}s</span>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Time</div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px', padding: '20px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div>
                    <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Your Best</span>
                    <strong style={{ fontSize: '1.25rem' }}>84 WPM</strong>
                </div>
                <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '24px' }}>
                    <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Your Average</span>
                    <strong style={{ fontSize: '1.25rem' }}>71 WPM</strong>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '30px' }}>
                <button className="btn btn-primary" onClick={onRestart}>Try Again</button>
                <button className="btn btn-ghost" onClick={onViewStats} style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>View Statistics</button>
            </div>
        </div>
    );
}

export default ResultCard;
