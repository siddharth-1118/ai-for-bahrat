import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you would verify the token with the backend
      // For now, we'll just set a dummy user
      try {
        setUser({ id: 1, name: 'Developer User', email: 'user@example.com' });
      } catch (error) {
        console.error('Error setting user:', error);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <NotificationProvider userId={user?.id}>
      <Router>
        <div className="app-layout">
          <Sidebar user={user} logout={logout} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/learning-path" element={user ? <LearningPath /> : <Navigate to="/login" />} />
              <Route path="/code-explainer" element={user ? <CodeExplainer /> : <Navigate to="/login" />} />
              <Route path="/productivity" element={user ? <ProductivityAnalyzer /> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
              <Route path="/analytics" element={user ? <AnalyticsDashboard /> : <Navigate to="/login" />} />
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