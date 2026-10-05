// ============================================================
// src/pages/Home.js — Landing / Home Page
// ============================================================
// The first page users see when they visit the app.
// Shows a hero section, feature highlights, and a call to action.
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Target, TrendingUp, Trophy, Code2, Zap } from 'lucide-react';

// Each feature card displayed on the home page
const FEATURES = [
    {
        icon: <Zap size={28} />,
        title: "Real-Time Speed",
        desc: "Your WPM updates live as you type. Instant feedback on every keystroke."
    },
    {
        icon: <Target size={28} />,
        title: "Accuracy Tracking",
        desc: "Every mistake is highlighted so you can pinpoint which keys trip you up most."
    },
    {
        icon: <Code2 size={28} />,
        title: "Code Mode",
        desc: "Practice typing real Python, JavaScript, Java, or C++ code snippets."
    },
    {
        icon: <TrendingUp size={28} />,
        title: "Progress Charts",
        desc: "Visualize your WPM and accuracy trends over time on your dashboard."
    },
    {
        icon: <Trophy size={28} />,
        title: "Global Leaderboard",
        desc: "See where you rank among all TypeCat users worldwide."
    },
    {
        icon: <Activity size={28} />,
        title: "Multiple Difficulties",
        desc: "Easy, medium, or hard — pick the challenge level that matches your skill."
    },
];

function Home() {
    return (
        <div className="container" style={{ paddingBottom: '80px' }}>

            {/* ── Hero Section ──────────────────────────────────────── */}
            <section style={{ textAlign: 'center', paddingTop: '90px', paddingBottom: '70px' }}>

                {/* Tagline badge */}
                <div style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    border: '1px solid rgba(255, 193, 7, 0.3)',
                    fontSize: '0.8rem',
                    color: 'var(--accent)',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '28px'
                }}>
                    The Modern Typing Test
                </div>

                {/* Main headline */}
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    marginBottom: '20px',
                    letterSpacing: '-1px',
                    lineHeight: 1.1
                }}>
                    Type faster.
                    <br />
                    <span style={{
                        background: 'linear-gradient(135deg, var(--accent), #F9E076)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Think faster.
                    </span>
                </h1>

                {/* Subtitle */}
                <p style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-muted)',
                    maxWidth: '560px',
                    margin: '0 auto 40px auto',
                    lineHeight: 1.7
                }}>
                    Measure your typing speed, improve accuracy, and track progress over time.
                    Practice words, quotes, or real code snippets.
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <Link to="/test" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
                        Start Typing Now
                    </Link>
                    <Link to="/leaderboard" className="btn btn-ghost" style={{ padding: '14px 32px', fontSize: '1.05rem', border: '1px solid var(--border)' }}>
                        View Leaderboard
                    </Link>
                </div>
            </section>

            {/* ── Stats Banner ─────────────────────────────────────── */}
            <section style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '24px',
                backgroundColor: 'var(--surface)',
                padding: '36px 48px',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                marginBottom: '80px'
            }}>
                {[
                    { value: '4',  label: 'Languages' },
                    { value: '3',  label: 'Difficulty Levels' },
                    { value: '60+', label: 'Text Passages' },
                    { value: '∞',  label: 'Room to Improve' },
                ].map(stat => (
                    <div key={stat.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)' }}>
                            {stat.value}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </section>

            {/* ── Features Grid ─────────────────────────────────────── */}
            <section>
                <h3 style={{ fontSize: '1.75rem', textAlign: 'center', marginBottom: '12px' }}>
                    Everything you need to type better.
                </h3>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '48px' }}>
                    Purpose-built features to help you practice effectively and measure real progress.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                    gap: '20px'
                }}>
                    {FEATURES.map((f, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{ cursor: 'default' }}
                        >
                            {/* Feature icon */}
                            <div style={{ color: 'var(--accent)', marginBottom: '16px' }}>
                                {f.icon}
                            </div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
                                {f.title}
                            </h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default Home;
