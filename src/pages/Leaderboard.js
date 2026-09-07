import React, { useState } from 'react';

function Leaderboard() {
    const [activeTab, setActiveTab] = useState('All Time');
    const tabs = ['Today', 'This Week', 'This Month', 'All Time'];

    const leaderboardData = [
        { rank: 1, user: 'Alex', wpm: 124, accuracy: '98%', isMe: false },
        { rank: 2, user: 'Rahul', wpm: 119, accuracy: '97%', isMe: false },
        { rank: 3, user: 'Maya', wpm: 115, accuracy: '99%', isMe: false },
        { rank: 4, user: 'David', wpm: 109, accuracy: '96%', isMe: false },
        { rank: 5, user: 'Sarah', wpm: 105, accuracy: '97%', isMe: false },
        { rank: 47, user: 'You', wpm: 78, accuracy: '96%', isMe: true },
    ];

    return (
        <div className="container" style={{ padding: '40px 0', paddingBottom: '80px', maxWidth: '800px' }}>

            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2.5rem' }}>Global Leaderboard</h2>
                <p style={{ color: 'var(--text-secondary)' }}>See how you compare with other typists across the world.</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600,
                            backgroundColor: activeTab === tab ? 'var(--accent)' : 'var(--surface)',
                            color: activeTab === tab ? 'var(--background)' : 'var(--text-secondary)',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div style={{ backgroundColor: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '16px 24px', fontWeight: 600, width: '15%' }}>Rank</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600, width: '45%' }}>User</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600, width: '20%' }}>WPM</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600, width: '20%' }}>Accuracy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((row, i) => (
                            <tr
                                key={i}
                                style={{
                                    borderBottom: '1px solid var(--border)',
                                    backgroundColor: row.isMe ? 'rgba(124, 221, 255, 0.1)' : 'transparent',
                                }}
                            >
                                <td style={{ padding: '20px 24px', fontWeight: 600, color: row.isMe ? 'var(--accent)' : 'var(--text-secondary)' }}>
                                    #{row.rank}
                                </td>
                                <td style={{ padding: '20px 24px', fontWeight: row.isMe ? 700 : 500, color: row.isMe ? 'var(--accent)' : 'var(--text-primary)' }}>
                                    {row.user} {row.isMe && '(You)'}
                                </td>
                                <td style={{ padding: '20px 24px', color: 'var(--accent)', fontWeight: 700 }}>
                                    {row.wpm}
                                </td>
                                <td style={{ padding: '20px 24px', color: 'var(--text-primary)' }}>
                                    {row.accuracy}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Leaderboard;
