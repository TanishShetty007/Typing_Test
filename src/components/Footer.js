import React from 'react';

function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            padding: '24px 0',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
        }}>
            <div className="container">
                &copy; {new Date().getFullYear()} TypeCat. Type faster. Think faster.
            </div>
        </footer>
    );
}

export default Footer;
