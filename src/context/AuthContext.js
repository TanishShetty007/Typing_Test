// ============================================================
// src/context/AuthContext.js — Global Auth State Manager
// ============================================================
// React Context lets us share the "logged-in user" state
// across the ENTIRE app without passing props everywhere.
//
// Any component can call:
//   const { user, login, logout } = useAuth();
// ============================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Step 1: Create the context object
// This is like creating an "empty container" that will hold our auth state
const AuthContext = createContext(null);

// Step 2: Create the Provider component
// This wraps the app and provides auth state to all children
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);      // currently logged-in user (or null)
    const [loading, setLoading] = useState(true); // true while we check if user is already logged in

    // When the app first loads, check if there's a saved token in localStorage
    // If yes, use it to fetch the user's profile and restore their session
    useEffect(() => {
        const token = localStorage.getItem('typecat_token');
        if (token) {
            // Try to get user data from the backend using the saved token
            api.getMe()
                .then(userData => setUser(userData))
                .catch(() => {
                    // Token is expired or invalid — clear it
                    localStorage.removeItem('typecat_token');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false); // No token found, user is not logged in
        }
    }, []);

    // Called after a successful login or register
    // Saves the token to localStorage and updates user state
    const login = (token, userData) => {
        localStorage.setItem('typecat_token', token);
        setUser(userData);
    };

    // Called when the user clicks "Log Out"
    const logout = () => {
        localStorage.removeItem('typecat_token');
        setUser(null);
    };

    // The value object is what gets shared with all child components
    const value = { user, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Step 3: Custom hook — makes it easy to use auth in any component
// Instead of: const { user } = useContext(AuthContext)
// You can write: const { user } = useAuth()
export function useAuth() {
    return useContext(AuthContext);
}
