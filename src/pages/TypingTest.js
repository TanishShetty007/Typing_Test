import React, { useState, useEffect, useRef } from 'react';
import { paragraphs } from '../data/paragraphs';
import TypingBox from '../components/TypingBox';
import ResultCard from '../components/ResultCard';

const DURATIONS = [15, 30, 60, 120];
const DIFFICULTIES = ['easy', 'medium', 'hard'];
const MODES = ['words', 'quotes', 'code'];

function TypingTest() {
    const [duration, setDuration] = useState(60);
    const [difficulty, setDifficulty] = useState('medium');
    const [mode, setMode] = useState('words');

    const [timeLeft, setTimeLeft] = useState(60);
    const [status, setStatus] = useState('waiting'); // waiting, active, finished
    const [userInput, setUserInput] = useState("");
    const [targetText, setTargetText] = useState("");
    const [isFocused, setIsFocused] = useState(true);

    const inputRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        // Generate text based on difficulty and mode
        const filtered = paragraphs.filter(p =>
            (mode === 'quotes' && p.category === 'quotes') ||
            (mode === 'code' && p.category === 'code') ||
            (mode === 'words' && p.category === 'general') ||
            p.difficulty === difficulty
        );
        const selected = filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)].text : paragraphs[0].text;
        setTargetText(selected);
        setTimeLeft(duration);
        setUserInput("");
        setStatus('waiting');
    }, [difficulty, mode, duration]);

    useEffect(() => {
        if (status === 'active' && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(t => t - 1);
            }, 1000);
        } else if (timeLeft === 0 && status === 'active') {
            setStatus('finished');
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [status, timeLeft]);

    useEffect(() => {
        if (status !== 'finished' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [status]);

    const handleInputChange = (e) => {
        const val = e.target.value;
        if (status === 'finished') return;

        if (status === 'waiting') {
            setStatus('active');
        }

        if (val.length <= targetText.length) {
            setUserInput(val);
        }

        if (val.length === targetText.length) {
            setStatus('finished');
            clearInterval(timerRef.current);
        }
    };

    const calculateStats = () => {
        const timeUsedMinutes = (duration - timeLeft) / 60;
        if (timeUsedMinutes === 0 && userInput.length === 0) return { wpm: 0, accuracy: 0, correct: 0, incorrect: 0, time: duration };
        let correct = 0;
        let incorrect = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === targetText[i]) correct++;
            else incorrect++;
        }
        const safeTime = timeUsedMinutes || (1 / 60); // avoid div by 0
        const wpm = Math.round((userInput.length / 5) / safeTime);
        const accuracy = userInput.length > 0 ? Math.round((correct / userInput.length) * 100) : 0;
        return { wpm, accuracy, correct, incorrect, time: duration - timeLeft };
    };

    const stats = calculateStats();

    const handleRestart = () => {
        setStatus('waiting');
        setTimeLeft(duration);
        setUserInput("");
        if (inputRef.current) inputRef.current.focus();
    };

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '1000px' }}>

            {/* Controls */}
            {status === 'waiting' && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px', backgroundColor: 'var(--surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {DURATIONS.map(d => (
                            <button key={d} onClick={() => setDuration(d)} style={{ padding: '6px 12px', borderRadius: '20px', border: 'none', background: duration === d ? 'var(--accent)' : 'transparent', color: duration === d ? 'var(--background)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600 }}>{d}s</button>
                        ))}
                    </div>
                    <div style={{ borderLeft: '1px solid var(--border)' }}></div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {DIFFICULTIES.map(d => (
                            <button key={d} onClick={() => setDifficulty(d)} style={{ padding: '6px 12px', borderRadius: '20px', border: 'none', background: difficulty === d ? 'var(--accent)' : 'transparent', color: difficulty === d ? 'var(--background)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize' }}>{d}</button>
                        ))}
                    </div>
                    <div style={{ borderLeft: '1px solid var(--border)' }}></div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {MODES.map(m => (
                            <button key={m} onClick={() => setMode(m)} style={{ padding: '6px 12px', borderRadius: '20px', border: 'none', background: mode === m ? 'var(--accent)' : 'transparent', color: mode === m ? 'var(--background)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize' }}>{m}</button>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Interface */}
            {status !== 'finished' ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div className="mono" style={{ fontSize: '2.5rem', color: 'var(--accent)', fontWeight: 800 }}>{timeLeft}</div>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>WPM</span>
                                <span className="mono" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.wpm}</span>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ACC</span>
                                <span className="mono" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.accuracy}%</span>
                            </div>
                        </div>
                    </div>

                    <TypingBox
                        text={targetText}
                        userInput={userInput}
                        inputRef={inputRef}
                        onInputChange={handleInputChange}
                        isFocused={isFocused}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        disabled={false}
                    />

                    <div style={{ textAlign: 'center' }}>
                        <button className="btn btn-ghost" onClick={handleRestart} style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                            Restart Test
                        </button>
                    </div>
                </>
            ) : (
                <ResultCard stats={stats} onRestart={handleRestart} onViewStats={() => window.location.href = '/dashboard'} />
            )}
        </div>
    );
}

export default TypingTest;
