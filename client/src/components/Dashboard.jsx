import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationPanel from './realtime/NotificationPanel';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLearnings: 0,
    completedPaths: 0,
    productivityScore: 0,
    recentActivity: []
  });

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalLearnings: 12,
        completedPaths: 3,
        productivityScore: 85,
        recentActivity: [
          { id: 1, title: 'React Fundamentals', type: 'learning', time: '2 hours ago' },
          { id: 2, title: 'Code Review', type: 'productivity', time: '1 day ago' },
          { id: 3, title: 'JavaScript Algorithms', type: 'learning', time: '2 days ago' }
        ]
      });
    }, 500);
  }, []);

  return (
    <div className="container">
      <h1>AI for Bharat Dashboard</h1>
      <p className="subtitle">Your AI-powered learning and productivity companion</p>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="card stat-card">
          <h3>Total Learnings</h3>
          <p className="stat-number">{stats.totalLearnings}</p>
        </div>
        <div className="card stat-card">
          <h3>Completed Paths</h3>
          <p className="stat-number">{stats.completedPaths}</p>
        </div>
        <div className="card stat-card">
          <h3>Productivity Score</h3>
          <p className="stat-number">{stats.productivityScore}%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/learning-path" className="action-btn">
            <div className="action-icon">📚</div>
            <h3>Learning Path</h3>
            <p>Create personalized learning journey</p>
          </Link>
          <Link to="/code-explainer" className="action-btn">
            <div className="action-icon">🔍</div>
            <h3>Code Explainer</h3>
            <p>Understand complex code snippets</p>
          </Link>
          <Link to="/productivity" className="action-btn">
            <div className="action-icon">⚡</div>
            <h3>Productivity Analyzer</h3>
            <p>Optimize your workflow</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {stats.recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-content">
                <h4>{activity.title}</h4>
                <span className={`activity-type ${activity.type}`}>
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </span>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
      <NotificationPanel />
    </div>
  );
};

export default Dashboard;