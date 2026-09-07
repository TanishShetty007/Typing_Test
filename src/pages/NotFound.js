import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
            <h1 style={{ fontSize: '4rem', color: 'var(--accent)' }}>404</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Looks like this page missed a keystroke.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
    );
}

export default NotFound;
