import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ user, logout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/learning-path', label: 'Learning Path', icon: '📚' },
    { path: '/code-explainer', label: 'Code Explainer', icon: '🔍' },
    { path: '/productivity', label: 'Productivity', icon: '⚡' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>AI for Bharat</h3>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {user ? (
            <>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={isActive(item.path) ? 'active' : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button className="logout-btn" onClick={logout}>
                  <span className="nav-icon">🚪</span>
                  <span className="nav-label">Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={isActive('/login') ? 'active' : ''}>
                  <span className="nav-icon">🔐</span>
                  <span className="nav-label">Login</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className={isActive('/register') ? 'active' : ''}>
                  <span className="nav-icon">📝</span>
                  <span className="nav-label">Register</span>
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className={isActive('/forgot-password') ? 'active' : ''}>
                  <span className="nav-icon">🔑</span>
                  <span className="nav-label">Forgot Password</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;