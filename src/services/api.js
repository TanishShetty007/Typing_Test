// ============================================================
// src/services/api.js — Frontend API Service Layer
// ============================================================
// This file handles ALL communication between the React frontend
// and the Express backend. Instead of writing fetch/axios calls
// all over the codebase, we centralize them here.
//
// Usage example:
//   import api from '../services/api';
//   const data = await api.login(email, password);
// ============================================================

import axios from 'axios';

// The base URL of our Express backend
// During development, the backend runs on port 5000
const BASE_URL = 'http://localhost:5000/api';

// Create an axios instance with default settings
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// ── Request Interceptor ──────────────────────────────────────
// Automatically attach the JWT token to every request that goes out.
// This way we don't have to manually add it in every API call.
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('typecat_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// ── API Methods ──────────────────────────────────────────────
const api = {

    // AUTH ─────────────────────────────────────────────────────

    // Register a new account
    // Returns: { token, user: { id, name, email } }
    register: async (name, email, password) => {
        const res = await axiosInstance.post('/auth/register', { name, email, password });
        return res.data;
    },

    // Log in to an existing account
    // Returns: { token, user: { id, name, email } }
    login: async (email, password) => {
        const res = await axiosInstance.post('/auth/login', { email, password });
        return res.data;
    },

    // Get the currently logged-in user's profile
    getMe: async () => {
        const res = await axiosInstance.get('/auth/me');
        return res.data;
    },

    // TESTS ────────────────────────────────────────────────────

    // Save a finished test result to the database
    saveTest: async (testData) => {
        const res = await axiosInstance.post('/tests', testData);
        return res.data;
    },

    // Get the user's recent test history
    getMyTests: async (limit = 20) => {
        const res = await axiosInstance.get(`/tests/my?limit=${limit}`);
        return res.data;
    },

    // Get the user's overall stats (best WPM, avg WPM, etc.)
    getMyStats: async () => {
        const res = await axiosInstance.get('/tests/stats');
        return res.data;
    },

    // LEADERBOARD ──────────────────────────────────────────────

    // Get the leaderboard for a given time period
    // filter options: 'alltime', 'today', 'week', 'month'
    getLeaderboard: async (filter = 'alltime') => {
        const res = await axiosInstance.get(`/leaderboard?filter=${filter}`);
        return res.data;
    },

    // PASSAGES ──────────────────────────────────────────────────

    // Fetch a random passage based on settings
    getPassage: async (mode, difficulty, language, duration) => {
        const params = new URLSearchParams({ mode, difficulty });
        if (mode === 'code' && language) {
            params.append('language', language);
        }
        if (duration) {
            params.append('duration', duration);
        }
        const res = await axiosInstance.get(`/passages/random?${params.toString()}`);
        return res.data;
    }
};

export default api;
