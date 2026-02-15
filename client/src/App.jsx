import React, { useState, useEffect } from 'react';
/* 
  REACT ROUTER:
  - Router: The container that keeps the UI in sync with the URL.
  - Routes & Route: Defined paths. If URL matches 'path', show 'element'.
  - Navigate: Used to redirect users (e.g., from Login to Dashboard).
*/
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// --- IMPORT COMPONENTS ---
import Dashboard from './components/Dashboard';
import LearningPath from './components/LearningPath';
import CodeExplainer from './components/CodeExplainer';
import ProductivityAnalyzer from './components/ProductivityAnalyzer';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Register from './components/Register';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ForgotPassword from './components/ForgotPassword';
import { NotificationProvider, useNotifications } from './components/realtime/NotificationPanel';
import Sidebar from './components/Sidebar';

function App() {
  // --- STATE (MEMORY) ---
  // useState: A Hook that lets React "remember" things.
  // [variable, functionToChangeIt] = useState(initialValue)
  const [user, setUser] = useState(null); // 'user' is null initially (not logged in)
  const [loading, setLoading] = useState(true); // 'loading' is true while we check for a token

  // --- USE EFFECT (SIDE EFFECTS) ---
  // This runs ONCE when the app starts (because of the empty [] array at the end).
  // It checks if the user is already logged in by looking for a token in the browser.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // (Simulation) In a real app, verify token with backend here.
      try {
        setUser({ id: 1, name: 'Developer User', email: 'user@example.com' });
      } catch (error) {
        console.error('Error setting user:', error);
        setUser(null);
      }
    }
    setLoading(false); // Finished loading
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem('token'); // Clear the token
      setUser(null); // Reset user state
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // Show spinner while checking auth
  }

  // --- THE UI (JSX) ---
  return (
    <NotificationProvider userId={user?.id}>
      <Router>
        <div className="app-layout">
          {/* Sidebar is always visible */}
          <Sidebar user={user} logout={logout} />
          <div className="main-content">
            <Routes>
              {/* 
                PROTECTED ROUTES:
                Pattern: user ? <Component /> : <Navigate to="/login" />
                Meaning: "If user exists, show Component. If not, go to Login."
              */}
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/learning-path" element={user ? <LearningPath /> : <Navigate to="/login" />} />
              <Route path="/code-explainer" element={user ? <CodeExplainer /> : <Navigate to="/login" />} />
              <Route path="/productivity" element={user ? <ProductivityAnalyzer /> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
              <Route path="/analytics" element={user ? <AnalyticsDashboard /> : <Navigate to="/login" />} />

              {/* PUBLIC ROUTES */}
              <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;