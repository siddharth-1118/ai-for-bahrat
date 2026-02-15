import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Developer User',
    email: 'user@example.com',
    joinDate: 'January 2024',
    learningGoals: ['Master React', 'Learn Node.js', 'Improve algorithms'],
    achievements: ['First Learning Path Completed', 'Code Explained 10 times', 'Productivity Analysis Done']
  });

  return (
    <div className="container">
      <h1>User Profile</h1>
      
      <div className="card">
        <div className="profile-header">
          <div className="avatar">👤</div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Member since {user.joinDate}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Learning Goals</h2>
        <ul className="goals-list">
          {user.learningGoals.map((goal, index) => (
            <li key={index} className="goal-item">
              <span className="goal-text">{goal}</span>
              <span className="goal-status">In Progress</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Achievements</h2>
        <ul className="achievements-list">
          {user.achievements.map((achievement, index) => (
            <li key={index} className="achievement-item">🏆 {achievement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;