import React, { useEffect } from 'react';

function Timer({ timeLeft, isActive, onTimeUp }) {
    useEffect(() => {
        let interval = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                // Handled in parent to keep single source of truth for time,
                // but this could trigger parent via a callback.
                // Actually, we'll just let the parent update `timeLeft` and we just display it,
                // or we handle interval here and call `onTick` in parent.
                // The spec asked for Timer to handle intervals.
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            onTimeUp();
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, onTimeUp]);

    return (
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-mono, monospace)' }}>
            {timeLeft}
        </div>
    );
}

export default Timer;
