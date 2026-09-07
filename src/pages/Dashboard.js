import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

function Dashboard() {
    const chartData = [
        { name: 'Test 1', wpm: 54, accuracy: 92 },
        { name: 'Test 2', wpm: 61, accuracy: 94 },
        { name: 'Test 3', wpm: 64, accuracy: 93 },
        { name: 'Test 4', wpm: 68, accuracy: 96 },
        { name: 'Test 5', wpm: 72, accuracy: 95 },
        { name: 'Test 6', wpm: 71, accuracy: 97 },
        { name: 'Test 7', wpm: 78, accuracy: 98 },
        { name: 'Test 8', wpm: 84, accuracy: 96 },
    ];

    const recentTests = [
        { date: 'Aug 24', mode: 'Quotes', wpm: 78, accuracy: '96%', duration: '60s' },
        { date: 'Aug 23', mode: 'Words', wpm: 74, accuracy: '95%', duration: '60s' },
        { date: 'Aug 22', mode: 'Code', wpm: 68, accuracy: '91%', duration: '60s' },
        { date: 'Aug 21', mode: 'Words', wpm: 65, accuracy: '93%', duration: '30s' },
    ];

    return (
        <div className="container" style={{ padding: '40px 0', paddingBottom: '80px' }}>

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem' }}>Welcome back</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Here's how your typing is improving.</p>
            </div>

            {/* Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Best WPM</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>84</div>
                </div>
                <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Average WPM</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>71</div>
                </div>
                <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Average Accuracy</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>95%</div>
                </div>
                <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Tests Completed</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>27</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
                {/* Speed Chart */}
                <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '24px' }}>Typing Speed</h3>
                    <div style={{ width: '100%', height: 300 }}>
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

                {/* Accuracy Chart */}
                <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '24px' }}>Accuracy Over Time</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis domain={['auto', 100]} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
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

            {/* Recent Tests Table */}
            <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '24px' }}>Recent Tests</h3>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '12px 8px', fontWeight: 600 }}>Date</th>
                            <th style={{ padding: '12px 8px', fontWeight: 600 }}>Mode</th>
                            <th style={{ padding: '12px 8px', fontWeight: 600 }}>WPM</th>
                            <th style={{ padding: '12px 8px', fontWeight: 600 }}>Accuracy</th>
                            <th style={{ padding: '12px 8px', fontWeight: 600 }}>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTests.map((t, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '16px 8px', color: 'var(--text-primary)' }}>{t.date}</td>
                                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{t.mode}</td>
                                <td style={{ padding: '16px 8px', color: 'var(--accent)', fontWeight: 600 }}>{t.wpm}</td>
                                <td style={{ padding: '16px 8px', color: 'var(--text-primary)' }}>{t.accuracy}</td>
                                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{t.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Dashboard;
