import React from 'react';

function TypingBox({ text, userInput, inputRef, onInputChange, isFocused, onFocus, onBlur, disabled }) {
    return (
        <div
            style={{ position: 'relative', marginTop: '40px', marginBottom: '40px' }}
            onClick={() => inputRef.current && inputRef.current.focus()}
        >
            {/* Hidden Input field */}
            <input
                type="text"
                ref={inputRef}
                value={userInput}
                onChange={onInputChange}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                style={{
                    position: 'absolute',
                    opacity: 0,
                    top: 0,
                    left: 0,
                    zIndex: -999
                }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
            />

            {/* Focus Warning Overlay */}
            {!isFocused && !disabled && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(11, 13, 16, 0.7)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '12px',
                    zIndex: 10,
                    cursor: 'pointer'
                }}>
                    <span style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 600 }}>
                        Click here or start typing to focus
                    </span>
                </div>
            )}

            {/* Rendered Text Box */}
            <div
                className="mono"
                style={{
                    fontSize: '1.5rem',
                    lineHeight: '1.6',
                    color: 'var(--text-muted)',
                    userSelect: 'none',
                    padding: '20px',
                    borderRadius: '12px',
                    minHeight: '150px'
                }}
            >
                {text.split('').map((char, i) => {
                    let color = 'var(--text-muted)';
                    let bg = 'transparent';
                    let borderBottom = 'none';

                    if (i < userInput.length) {
                        const isCorrect = userInput[i] === char;
                        color = isCorrect ? 'var(--text-primary)' : 'var(--error)';
                        if (!isCorrect) {
                            bg = 'rgba(255, 107, 107, 0.15)';
                        }
                    } else if (i === userInput.length && isFocused && !disabled) {
                        borderBottom = '2px solid var(--accent)'; // Cursor
                    }

                    return (
                        <span
                            key={i}
                            style={{
                                color,
                                backgroundColor: bg,
                                borderBottom,
                                transition: 'color 0.1s ease',
                                display: 'inline-block',
                                minWidth: char === ' ' ? '14px' : 'auto'
                            }}
                        >
                            {char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export default TypingBox;
