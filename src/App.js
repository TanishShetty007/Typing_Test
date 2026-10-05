// ============================================================
// src/App.js — Root Application Component
// ============================================================
// This is the top-level component that:
//   1. Wraps the app in AuthProvider (so all components can
//      access the logged-in user's state)
//   2. Sets up React Router with all the page routes
//   3. Renders the Navbar at the top and Footer at the bottom
// ============================================================

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth context that provides user state to the whole app
import { AuthProvider } from "./context/AuthContext";

// Shared layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Page components (each is a separate route/URL)
import Home from "./pages/Home";
import TypingTest from "./pages/TypingTest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

function App() {
    return (
        // AuthProvider wraps everything — any child component can now
        // call useAuth() to access user info, login(), logout()
        <AuthProvider>
            <BrowserRouter>
                {/* Flex column layout so footer always stays at the bottom */}
                <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                    <Navbar />

                    {/* Main content area — flex: 1 means it takes all remaining space */}
                    <main style={{ flex: 1 }}>
                        <Routes>
                            <Route path="/"            element={<Home />} />
                            <Route path="/test"        element={<TypingTest />} />
                            <Route path="/login"       element={<Login />} />
                            <Route path="/register"    element={<Register />} />
                            <Route path="/dashboard"   element={<Dashboard />} />
                            <Route path="/leaderboard" element={<Leaderboard />} />
                            {/* Catch-all: show 404 for any unknown URL */}
                            <Route path="*"            element={<NotFound />} />
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
