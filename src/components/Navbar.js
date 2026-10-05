// ============================================================
// src/components/Navbar.js — Navigation Bar Component
// ============================================================
// Shows the app logo, nav links, and login/logout buttons.
// Uses useAuth() to know if someone is logged in so it can
// show "Dashboard" link and "Log Out" button when appropriate.
// ============================================================

import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Keyboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
    // Get the current user and logout function from our auth context
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Called when the user clicks "Log Out"
    const handleLogout = () => {
        logout();          // clears the token from localStorage
        navigate('/');     // redirect to home page
    };

    return (
        <header className="navbar-container">
            <div className="navbar-content">

                {/* Logo — clicking it goes to the home page */}
                <Link to="/" className="navbar-brand">
                    <Keyboard className="logo-icon" size={24} />
                    <span className="logo-text">TypeCat</span>
                </Link>

                {/* Navigation Links */}
                <nav className="navbar-links">
                    <NavLink to="/"
                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        end  // "end" means only match exactly "/" not "/anything"
                    >
                        Home
                    </NavLink>

                    <NavLink to="/test"
                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >
                        Typing Test
                    </NavLink>

                    <NavLink to="/leaderboard"
                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >
                        Leaderboard
                    </NavLink>

                    {/* Dashboard is always visible in the nav */}
                    <NavLink to="/dashboard"
                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >
                        Dashboard
                    </NavLink>
                </nav>

                {/* Action buttons on the right */}
                <div className="navbar-actions">
                    {user ? (
                        // User IS logged in — show their name and a logout button
                        <>
                            <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>
                                👋 {user.name}
                            </span>
                            <button className="btn btn-ghost" onClick={handleLogout}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        // User is NOT logged in — show login/register buttons
                        <>
                            <Link to="/login" className="btn btn-ghost">Login</Link>
                            <Link to="/register" className="btn btn-primary">Get Started</Link>
                        </>
                    )}
                </div>

            </div>
        </header>
    );
}

export default Navbar;
