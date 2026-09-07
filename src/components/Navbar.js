import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Keyboard } from 'lucide-react';
import './Navbar.css';

function Navbar() {
    return (
        <header className="navbar-container">
            <div className="navbar-content">
                <Link to="/" className="navbar-brand">
                    <Keyboard className="logo-icon" size={24} />
                    <span className="logo-text">TypeCat</span>
                </Link>
                <nav className="navbar-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
                        Home
                    </NavLink>
                    <NavLink to="/test" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Typing Test
                    </NavLink>
                    <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Leaderboard
                    </NavLink>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Dashboard
                    </NavLink>
                </nav>
                <div className="navbar-actions">
                    <Link to="/login" className="btn btn-ghost">Login</Link>
                    <Link to="/register" className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
