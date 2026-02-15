import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationPanel from './realtime/NotificationPanel';

import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLearnings: 12,
    completedPaths: 3,
    productivityScore: 85,
    earnings: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token
          }
        };

        const res = await axios.get('/api/auth/me', config);
        const user = res.data.user;

        setStats({
          totalLearnings: user.learningProgress?.length || 0,
          completedPaths: user.learningProgress?.filter(p => p.completed).length || 0,
          productivityScore: Math.round(user.productivityStats?.averageFocusTime || 85), // Default to 85 if 0
          earnings: user.earnings || 0,
          recentActivity: [
            { id: 1, title: 'React Fundamentals', type: 'learning', time: '2 hours ago' },
            { id: 2, title: 'Code Review', type: 'productivity', time: '1 day ago' },
            // Add mock activity if empty
          ]
        });
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="container">
      <h1>AI for Bharat Dashboard</h1>
      <p className="subtitle">Your AI-powered learning and productivity companion</p>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="card stat-card" style={{ borderLeft: '5px solid #ff9800' }}>
          <h3>Bharat Coins 🪙</h3>
          <p className="stat-number">{stats.earnings}</p>
        </div>
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


      {/* Roadmap Section */}
      <div className="card">
        <h2>My Learning Roadmap 🚀</h2>
        {/* We can fetch the roadmap dynamically or just show the same static one for now based on goal */}
        {/* For this MVP, let's just show a placeholder if we don't have the sophisticated logic yet */}
        <div className="timeline">
          {[
            { step: 'HTML & CSS', status: 'completed' },
            { step: 'JavaScript', status: 'in-progress' },
            { step: 'React', status: 'locked' },
            { step: 'Backend', status: 'locked' }
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{
                background: item.status === 'completed' ? '#2ecc71' : item.status === 'in-progress' ? '#f39c12' : '#bdc3c7',
                color: 'white',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '0.8rem'
              }}>{item.status === 'completed' ? '✓' : index + 1}</div>
              <div style={{ color: item.status === 'locked' ? '#95a5a6' : '#2c3e50' }}>{item.step}</div>
            </div>
          ))}
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
          <div className="activity-item">
            <div className="activity-content">
              <h4>System Update</h4>
              <p>Welcome to the new Earnings System! Complete courses to earn coins.</p>
            </div>
            <div className="activity-time">Just now</div>
          </div>
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
    </div >
  );
};

export default Dashboard;