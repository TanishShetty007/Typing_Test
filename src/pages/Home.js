import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Target, TrendingUp, Trophy } from 'lucide-react';

function Home() {
    return (
        <div className="container" style={{ paddingBottom: '60px' }}>

            {/* Hero Section */}
            <section style={{ textAlign: 'center', paddingTop: '80px', paddingBottom: '60px' }}>
                <div style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '20px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '24px' }}>
                    THE MODERN TYPING TEST
                </div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', letterSpacing: '-1px' }}>
                    Type faster.<br />Think faster.
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px auto' }}>
                    Measure your typing speed, improve your accuracy, and track your progress over time with our distraction-free, professional interface.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <Link to="/test" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.1rem' }}>
                        Start Typing
                    </Link>
                    <Link to="/leaderboard" className="btn btn-ghost" style={{ padding: '14px 28px', fontSize: '1.1rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                        View Leaderboard
                    </Link>
                </div>
            </section>

            {/* Hero Typing Preview / Stats */}
            <section style={{ marginBottom: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'var(--surface)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>10K+</h2>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>Tests Completed</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>120+</h2>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>WPM Record</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>98%</h2>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>Average Accuracy</span>
                </div>
            </section>

            {/* Features Section */}
            <section>
                <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '40px' }}>Everything you need to type better.</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>

                    <div style={{ backgroundColor: 'var(--surface)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-5px)' } }}>
                        <Activity color="var(--accent)" size={32} style={{ marginBottom: '16px' }} />
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Real-Time Speed</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Track WPM instantly as you string words together, ensuring accurate speed diagnostics.</p>
                    </div>

                    <div style={{ backgroundColor: 'var(--surface)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <Target color="var(--accent)" size={32} style={{ marginBottom: '16px' }} />
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Accuracy Tracking</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Detect precisely where performance dips so you can build cleaner muscle memory.</p>
                    </div>

                    <div style={{ backgroundColor: 'var(--surface)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <TrendingUp color="var(--accent)" size={32} style={{ marginBottom: '16px' }} />
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Progress Analytics</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>View comprehensive historical metrics on your personalized dashboard.</p>
                    </div>

                    <div style={{ backgroundColor: 'var(--surface)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <Trophy color="var(--accent)" size={32} style={{ marginBottom: '16px' }} />
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Global Leaderboard</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Compare your top speed with other typists around the world to stay motivated.</p>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default Home;
