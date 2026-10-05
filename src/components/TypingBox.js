// ============================================================
// src/components/TypingBox.js — The Typing Test Display
// ============================================================
// This component shows the target text character by character,
// coloring each letter based on whether the user typed it:
//   - Grey   → not yet typed
//   - White  → typed correctly ✓
//   - Red    → typed incorrectly ✗
//   - Golden underline → current cursor position
//
// There is a hidden <input> that captures keystrokes.
// Clicking anywhere on the box focuses that hidden input.
// ============================================================

import React from 'react';

function TypingBox({ text, userInput, inputRef, onInputChange, isFocused, onFocus, onBlur, disabled, isCode }) {
    return (
        <div
            style={{ position: 'relative', marginTop: '32px', marginBottom: '32px' }}
            // Clicking the box focuses the hidden input
            onClick={() => inputRef.current && inputRef.current.focus()}
        >
            {/* ── Hidden Input ───────────────────────────────────────
                The user types into this invisible input field.
                We hide it visually but it still captures keystrokes.
                autoComplete/autoCorrect/spellCheck are all disabled
                so the browser doesn't interfere with the test.
            ──────────────────────────────────────────────────────── */}
            <input
                type="text"
                ref={inputRef}
                value={userInput}
                onChange={onInputChange}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                style={{ position: 'absolute', opacity: 0, top: 0, left: 0, zIndex: -999 }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
            />

            {/* ── Focus Warning Overlay ──────────────────────────────
                If the user clicks away and the input loses focus,
                we show a semi-transparent overlay prompting them
                to click back to continue typing.
            ──────────────────────────────────────────────────────── */}
            {!isFocused && !disabled && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 248, 231, 0.85)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '12px',
                    zIndex: 10,
                    cursor: 'pointer'
                }}>
                    <span style={{ color: 'var(--accent)', fontSize: '1.1rem', fontWeight: 600 }}>
                        🖱️ Click here to focus and start typing
                    </span>
                </div>
            )}

            {/* ── Character Display Area ─────────────────────────────
                We split the text into individual characters and
                render each as a <span> with a different color.
            ──────────────────────────────────────────────────────── */}
            <div
                className="mono"
                style={{
                    // Code mode uses smaller font and preserves whitespace
                    fontSize: isCode ? '1.1rem' : '1.6rem',
                    lineHeight: isCode ? '2' : '1.8',
                    color: 'var(--text-muted)',
                    userSelect: 'none',       // prevents text selection while typing
                    padding: '28px 32px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    minHeight: '120px',
                    cursor: 'text',
                    // Preserve line breaks and spaces for formatting (especially in code)
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontFamily: isCode ? "'JetBrains Mono', 'Fira Code', monospace" : "inherit"
                }}
            >
                {text.split('').map((char, i) => {
                    // Default: not yet typed → grey/muted color
                    let color = 'var(--text-muted)';
                    let background = 'transparent';
                    let borderBottom = 'none';

                    if (i < userInput.length) {
                        // This character has been typed — check if correct
                        const isCorrect = userInput[i] === char;
                        color = isCorrect ? 'var(--text-primary)' : 'var(--error)';
                        if (!isCorrect) {
                            // Red background highlight for mistakes
                            background = 'rgba(255, 87, 34, 0.2)';
                        }
                    } else if (i === userInput.length && isFocused && !disabled) {
                        // This is where the cursor is — golden underline
                        borderBottom = '2px solid var(--accent)';
                    }

                    return (
                        <span
                            key={i}
                            style={{
                                color,
                                backgroundColor: background,
                                borderBottom,
                                transition: 'color 0.08s ease'
                            }}
                        >
                            {/* Render the character as-is, pre-wrap handles newlines and spaces */}
                            {char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export default TypingBox;
