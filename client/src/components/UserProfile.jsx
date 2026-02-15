import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = { headers: { 'x-auth-token': token } };
        const res = await axios.get('/api/auth/me', config);
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading Profile...</div>;
  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="container">
      <h1>User Profile</h1>

      <div className="card">
        <div className="profile-header">
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" className="avatar-img" style={{ width: '80px', height: '80px', borderRadius: '50%', marginRight: '20px' }} />
          ) : (
            <div className="avatar" style={{ fontSize: '3rem', marginRight: '20px' }}>👤</div>
          )}
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            {user.earnings > 0 && <p className="badge" style={{ background: '#ff9800', color: 'white', padding: '5px 10px', borderRadius: '15px', display: 'inline-block', marginTop: '5px' }}>🪙 {user.earnings} Coins</p>}
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Target Skills & Languages</h2>
        {user.preferences && user.preferences.preferredLanguages && user.preferences.preferredLanguages.length > 0 ? (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {user.preferences.preferredLanguages.map((lang, index) => (
              <span key={index} style={{ background: '#e3f2fd', color: '#1976d2', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold' }}>
                {lang}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ color: '#666' }}>No target skills set yet. Generate a learning path to set one!</p>
        )}
      </div>

      <div className="card">
        <h2>Learning Goals</h2>
        {user.preferences && user.preferences.learningGoals && user.preferences.learningGoals.length > 0 ? (
          <ul className="goals-list">
            {user.preferences.learningGoals.map((goal, index) => (
              <li key={index} className="goal-item">
                <span className="goal-text">{goal}</span>
                <span className="goal-status">In Progress</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#666' }}>No specific goals set yet.</p>
        )}
      </div>

      <div className="card">
        <h2>Achievements</h2>
        <ul className="achievements-list">
          {user.earningHistory && user.earningHistory.length > 0 ? (
            user.earningHistory.map((history, index) => (
              <li key={index} className="achievement-item">🏆 Earned {history.amount} coins via {history.source}</li>
            ))
          ) : (
            <li className="achievement-item">🌟 Joined AI for Bharat!</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;