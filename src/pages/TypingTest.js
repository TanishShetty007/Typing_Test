// ============================================================
// src/pages/TypingTest.js — Main Typing Test Page
// ============================================================
// This is the core feature of the app. It handles:
//   1. Settings selection (duration, difficulty, mode, language)
//   2. Timer countdown
//   3. User input handling and WPM/accuracy calculation
//   4. Saving results to the backend (if logged in)
//   5. Showing the ResultCard when the test finishes
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import TypingBox from '../components/TypingBox';
import ResultCard from '../components/ResultCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Available options for each setting
const DURATIONS   = [15, 30, 60, 120];
const DIFFICULTIES = ['easy', 'medium', 'hard'];
const MODES       = ['words', 'quotes', 'code'];
const LANGUAGES   = ['javascript', 'python', 'java', 'cpp'];

// Human-readable labels for language codes
const LANGUAGE_LABELS = {
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java',
    cpp: 'C++'
};

function TypingTest() {
    // ── Settings State ─────────────────────────────────────────
    const [duration,   setDuration]   = useState(60);
    const [difficulty, setDifficulty] = useState('medium');
    const [mode,       setMode]       = useState('words');
    const [language,   setLanguage]   = useState('javascript');

    // ── Test State ─────────────────────────────────────────────
    // status: 'waiting' (not started), 'active' (running), 'finished'
    const [status,      setStatus]      = useState('waiting');
    const [timeLeft,    setTimeLeft]    = useState(60);
    const [userInput,   setUserInput]   = useState('');
    const [targetText,  setTargetText]  = useState('');
    const [isFocused,   setIsFocused]   = useState(true);
    const [isLoading,   setIsLoading]   = useState(true);
    // For code mode: the explanation shown after the test
    const [codeExplanation, setCodeExplanation] = useState(null);
    // Whether the result was saved to the database
    const [saved, setSaved] = useState(false);

    // Refs don't cause re-renders — good for the timer interval
    const inputRef = useRef(null);
    const timerRef = useRef(null);

    // Get the logged-in user from auth context
    const { user } = useAuth();

    // ── Load a New Passage ─────────────────────────────────────
    // This runs when the user changes any setting, or on first render.
    // It fetches a random matching passage from the backend API.
    useEffect(() => {
        setIsLoading(true);
        api.getPassage(mode, difficulty, language, duration)
            .then(passage => {
                setTargetText(passage.text);
                // Store the code explanation if this is a code passage
                setCodeExplanation(passage.explanation || null);
                // Reset the test state
                setTimeLeft(duration);
                setUserInput('');
                setStatus('waiting');
                setSaved(false);
            })
            .catch(err => {
                console.error("Failed to fetch passage:", err);
                setTargetText("Error loading text. Please try again.");
                setCodeExplanation(null);
                setStatus('waiting');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [difficulty, mode, duration, language]);

    // ── Timer Logic ────────────────────────────────────────────
    // Starts counting down when status becomes 'active'.
    // Stops when timeLeft hits 0, marking the test as 'finished'.
    useEffect(() => {
        if (status === 'active' && timeLeft > 0) {
            // setInterval calls the callback every 1000ms (1 second)
            timerRef.current = setInterval(() => {
                setTimeLeft(t => t - 1); // decrement time by 1
            }, 1000);

        } else if (timeLeft === 0 && status === 'active') {
            // Time ran out!
            setStatus('finished');
            clearInterval(timerRef.current);
        }

        // Cleanup: always clear the interval when this effect re-runs
        // (prevents multiple intervals stacking up)
        return () => clearInterval(timerRef.current);
    }, [status, timeLeft]);

    // ── Auto-Focus Input ───────────────────────────────────────
    // Keep the hidden input focused so keystrokes are captured
    useEffect(() => {
        if (status !== 'finished' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [status]);

    // ── Save Result to Backend ─────────────────────────────────
    // When the test finishes and the user is logged in, save their result.
    useEffect(() => {
        if (status === 'finished' && user && !saved) {
            const stats = calculateStats();
            // Don't save if they didn't actually type anything
            if (stats.wpm > 0) {
                api.saveTest({
                    wpm:           stats.wpm,
                    accuracy:      stats.accuracy,
                    duration:      duration,
                    mode:          mode,
                    difficulty:    difficulty,
                    language:      mode === 'code' ? language : null,
                    correctChars:  stats.correct,
                    incorrectChars: stats.incorrect
                }).catch(err => console.error('Failed to save test:', err));
                setSaved(true); // prevent saving multiple times
            }
        }
    }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Handle Keystroke ───────────────────────────────────────
    // Called every time the user types a character.
    const handleInputChange = (e) => {
        const val = e.target.value;
        if (status === 'finished') return; // ignore input after test ends

        // First keystroke starts the timer
        if (status === 'waiting') {
            setStatus('active');
        }

        // Don't allow typing past the end of the target text
        if (val.length <= targetText.length) {
            setUserInput(val);
        }

        // If they've typed the full text, finish the test
        if (val.length === targetText.length) {
            setStatus('finished');
            clearInterval(timerRef.current);
        }
    };

    // ── Calculate Stats ────────────────────────────────────────
    // Computes WPM and accuracy from the current userInput state.
    const calculateStats = () => {
        const timeUsedSeconds = duration - timeLeft;
        const timeUsedMinutes = timeUsedSeconds / 60;

        // Edge case: no input typed
        if (timeUsedMinutes === 0 && userInput.length === 0) {
            return { wpm: 0, accuracy: 0, correct: 0, incorrect: 0, time: 0 };
        }

        // Count correct and incorrect characters
        let correct = 0;
        let incorrect = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === targetText[i]) correct++;
            else incorrect++;
        }

        // WPM = (characters typed / 5) / minutes
        // The "/ 5" converts characters to "words" (standard definition)
        const safeTime = timeUsedMinutes || (1 / 60); // avoid division by zero
        const wpm = Math.round((userInput.length / 5) / safeTime);

        // Accuracy = correct characters / total characters typed * 100
        const accuracy = userInput.length > 0
            ? Math.round((correct / userInput.length) * 100)
            : 0;

        return { wpm, accuracy, correct, incorrect, time: timeUsedSeconds };
    };

    const stats = calculateStats();

    // ── Restart ────────────────────────────────────────────────
    // Resets everything without changing the settings
    const handleRestart = () => {
        setStatus('waiting');
        setTimeLeft(duration);
        setUserInput('');
        setSaved(false);
        if (inputRef.current) inputRef.current.focus();
    };

    // ── New Text ───────────────────────────────────────────────
    // Pick a new random passage with the same settings
    const handleNewText = () => {
        setIsLoading(true);
        api.getPassage(mode, difficulty, language, duration)
            .then(passage => {
                setTargetText(passage.text);
                setCodeExplanation(passage.explanation || null);
                setStatus('waiting');
                setTimeLeft(duration);
                setUserInput('');
                setSaved(false);
            })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    };

    // ── Render ─────────────────────────────────────────────────
    return (
        <div className="container fade-in" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '980px' }}>

            {/* ── Settings Bar (only shown before the test starts) ── */}
            {status === 'waiting' && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '24px',
                    marginBottom: '32px',
                    backgroundColor: 'var(--surface)',
                    padding: '20px 24px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)'
                }}>

                    {/* Duration Selector */}
                    <SettingGroup label="Time">
                        {DURATIONS.map(d => (
                            <SettingButton
                                key={d}
                                label={`${d}s`}
                                active={duration === d}
                                onClick={() => setDuration(d)}
                            />
                        ))}
                    </SettingGroup>

                    <Divider />

                    {/* Difficulty Selector */}
                    <SettingGroup label="Difficulty">
                        {DIFFICULTIES.map(d => (
                            <SettingButton
                                key={d}
                                label={d}
                                active={difficulty === d}
                                onClick={() => setDifficulty(d)}
                            />
                        ))}
                    </SettingGroup>

                    <Divider />

                    {/* Mode Selector */}
                    <SettingGroup label="Mode">
                        {MODES.map(m => (
                            <SettingButton
                                key={m}
                                label={m}
                                active={mode === m}
                                onClick={() => setMode(m)}
                            />
                        ))}
                    </SettingGroup>

                    {/* Language Selector — only appears in code mode */}
                    {mode === 'code' && (
                        <>
                            <Divider />
                            <SettingGroup label="Language">
                                {LANGUAGES.map(lang => (
                                    <SettingButton
                                        key={lang}
                                        label={LANGUAGE_LABELS[lang]}
                                        active={language === lang}
                                        onClick={() => setLanguage(lang)}
                                    />
                                ))}
                            </SettingGroup>
                        </>
                    )}
                </div>
            )}

            {/* ── Live Test Interface ───────────────────────────────── */}
            {status !== 'finished' ? (
                <>
                    {/* Stats bar: Timer on the left, live WPM/ACC on the right */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px'
                    }}>
                        {/* Countdown timer */}
                        <div className="mono" style={{
                            fontSize: '2.5rem',
                            color: timeLeft <= 5 ? 'var(--error)' : 'var(--accent)',
                            fontWeight: 800,
                            transition: 'color 0.3s'
                        }}>
                            {timeLeft}
                        </div>

                        {/* Mode / Language tag */}
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'capitalize' }}>
                            {mode === 'code' ? `${LANGUAGE_LABELS[language]} Code` : mode} · {difficulty}
                        </div>

                        {/* Live WPM and Accuracy (only shows when test is active) */}
                        {status === 'active' && (
                            <div style={{ display: 'flex', gap: '24px' }}>
                                <Stat label="WPM" value={stats.wpm} />
                                <Stat label="ACC" value={`${stats.accuracy}%`} />
                            </div>
                        )}
                        {status === 'waiting' && (
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                Start typing to begin
                            </div>
                        )}
                    </div>

                    {/* The typing box where text appears */}
                    {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                            Loading text...
                        </div>
                    ) : (
                        <TypingBox
                            text={targetText}
                            userInput={userInput}
                            inputRef={inputRef}
                            onInputChange={handleInputChange}
                            isFocused={isFocused}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            disabled={false}
                            isCode={mode === 'code'}
                        />
                    )}

                    {/* Control buttons below the typing box */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                        <button
                            className="btn btn-ghost"
                            onClick={handleRestart}
                            style={{ border: '1px solid var(--border)' }}
                        >
                            ↺ Restart
                        </button>
                        <button
                            className="btn btn-ghost"
                            onClick={handleNewText}
                            style={{ border: '1px solid var(--border)' }}
                        >
                            ⟳ New Text
                        </button>
                    </div>
                </>
            ) : (
                /* ── Results Screen ──────────────────────────────────── */
                <>
                    {/* Show a note if the user is not logged in */}
                    {!user && (
                        <div style={{
                            textAlign: 'center',
                            marginBottom: '16px',
                            padding: '12px',
                            backgroundColor: 'rgba(255, 193, 7, 0.1)',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 193, 7, 0.2)',
                            fontSize: '0.9rem',
                            color: 'var(--accent)'
                        }}>
                            💾 <strong>Log in</strong> to save your results and track progress!
                        </div>
                    )}

                    <ResultCard
                        stats={stats}
                        onRestart={handleRestart}
                        onViewStats={() => window.location.href = '/dashboard'}
                        codeExplanation={codeExplanation}
                    />
                </>
            )}
        </div>
    );
}

// ── Small Helper Components ────────────────────────────────
// These make the JSX above cleaner and easier to read.

/** A group of settings buttons with a label above */
function SettingGroup({ label, children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600
            }}>
                {label}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
                {children}
            </div>
        </div>
    );
}

/** Individual selectable setting option button */
function SettingButton({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? '#1a1200' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem',
                textTransform: 'capitalize',
                transition: 'all 0.15s ease'
            }}
        >
            {label}
        </button>
    );
}

/** Vertical divider between setting groups */
function Divider() {
    return <div style={{ borderLeft: '1px solid var(--border)', height: '40px', alignSelf: 'center' }} />;
}

/** Live stat display (WPM / Accuracy) during test */
function Stat({ label, value }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                {label}
            </span>
            <span className="mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>
                {value}
            </span>
        </div>
    );
}

export default TypingTest;
