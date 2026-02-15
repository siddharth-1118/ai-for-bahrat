import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [weeklyReport, setWeeklyReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch all analytics data in parallel
      const [analyticsRes, insightsRes, recsRes, weeklyRes] = await Promise.all([
        axios.get('http://localhost:5000/api/analytics/user', {
          headers: { 'x-auth-token': token }
        }),
        axios.get('http://localhost:5000/api/analytics/productivity', {
          headers: { 'x-auth-token': token }
        }),
        axios.get('http://localhost:5000/api/analytics/recommendations', {
          headers: { 'x-auth-token': token }
        }),
        axios.get('http://localhost:5000/api/analytics/weekly-report', {
          headers: { 'x-auth-token': token }
        })
      ]);

      setAnalytics(analyticsRes.data);
      setInsights(insightsRes.data);
      setRecommendations(recsRes.data);
      setWeeklyReport(weeklyRes.data);
      setError('');
    } catch (err) {
      setError('Failed to load analytics data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading analytics dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Learning Analytics Dashboard</h1>
      
      {error && <div className="error">{error}</div>}
      
      <div className="analytics-grid">
        {/* Stats Cards */}
        {analytics && (
          <div className="card stats-overview">
            <h2>Learning Overview</h2>
            <div className="stats-cards">
              <div className="stat-card">
                <h3>{analytics.totalCourses}</h3>
                <p>Total Courses</p>
              </div>
              <div className="stat-card">
                <h3>{analytics.completedCourses}</h3>
                <p>Courses Completed</p>
              </div>
              <div className="stat-card">
                <h3>{analytics.completionRate}%</h3>
                <p>Completion Rate</p>
              </div>
              <div className="stat-card">
                <h3>{analytics.avgProgress}%</h3>
                <p>Avg Progress</p>
              </div>
            </div>
          </div>
        )}

        {/* Productivity Insights */}
        {insights && (
          <div className="card">
            <h2>Productivity Insights</h2>
            <div className="insights-list">
              {insights.insights.map((insight, index) => (
                <div key={index} className="insight-item">
                  <div className="insight-icon">📊</div>
                  <div className="insight-content">{insight}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Report */}
        {weeklyReport && (
          <div className="card">
            <h2>Weekly Progress Report</h2>
            <div className="weekly-stats">
              <div className="stat-item">
                <span className="stat-label">Activities Completed:</span>
                <span className="stat-value">{weeklyReport.activitiesCompleted}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Courses Started:</span>
                <span className="stat-value">{weeklyReport.coursesStarted}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">AI Interactions:</span>
                <span className="stat-value">{weeklyReport.aiInteractions}</span>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="card">
            <h2>Personalized Recommendations</h2>
            <div className="recommendations-grid">
              {recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <div className="rec-header">
                    <h4>{rec.title}</h4>
                    <span className={`rec-type ${rec.type}`}>{rec.type}</span>
                  </div>
                  <p className="rec-reason">{rec.reason}</p>
                  <div className="rec-meta">
                    <span className="rec-time">{rec.estimatedTime}</span>
                    <span className="rec-difficulty">{rec.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;