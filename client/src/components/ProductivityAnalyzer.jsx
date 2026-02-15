import React, { useState } from 'react';
import axios from 'axios';

const ProductivityAnalyzer = () => {
  const [formData, setFormData] = useState({
    workData: '',
    timeSpent: '',
    challenges: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('insights');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/productivity/analyze', formData);
      setResult(response.data);
      setActiveTab('insights');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    const tabs = [
      { id: 'insights', label: 'Insights', icon: '💡' },
      { id: 'timeManagement', label: 'Time Management', icon: '⏰' },
      { id: 'focusTips', label: 'Focus Tips', icon: '🎯' },
      { id: 'tools', label: 'Tools', icon: '🛠️' }
    ];

    const getContent = () => {
      switch(activeTab) {
        case 'insights':
          return (
            <div>
              <h3>Productivity Insights</h3>
              <ul className="insights-list">
                {(result.insights || []).map((insight, index) => (
                  <li key={index} className="insight-item">{insight}</li>
                ))}
              </ul>
            </div>
          );
        case 'timeManagement':
          return (
            <div>
              <h3>Time Management Recommendations</h3>
              <ul className="recommendations-list">
                {(result.timeManagement || []).map((rec, index) => (
                  <li key={index} className="recommendation-item">{rec}</li>
                ))}
              </ul>
            </div>
          );
        case 'focusTips':
          return (
            <div>
              <h3>Focus Improvement Suggestions</h3>
              <ul className="tips-list">
                {(result.focusTips || []).map((tip, index) => (
                  <li key={index} className="tip-item">{tip}</li>
                ))}
              </ul>
            </div>
          );
        case 'tools':
          return (
            <div>
              <h3>Recommended Tools</h3>
              <ul className="tools-list">
                {(result.tools || []).map((tool, index) => (
                  <li key={index} className="tool-item">{tool}</li>
                ))}
              </ul>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="analysis-results">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="tab-content">
          {getContent()}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Productivity Analyzer</h1>
      <p>Optimize your workflow with AI-powered insights and recommendations</p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="workData">Work Activities</label>
            <textarea
              id="workData"
              value={formData.workData}
              onChange={(e) => setFormData({...formData, workData: e.target.value})}
              placeholder="Describe your typical work activities (e.g., coding, meetings, research, testing)"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="timeSpent">Time Distribution</label>
            <textarea
              id="timeSpent"
              value={formData.timeSpent}
              onChange={(e) => setFormData({...formData, timeSpent: e.target.value})}
              placeholder="How do you spend your time? (e.g., 60% coding, 20% meetings, 20% learning)"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="challenges">Challenges Faced</label>
            <textarea
              id="challenges"
              value={formData.challenges}
              onChange={(e) => setFormData({...formData, challenges: e.target.value})}
              placeholder="What challenges do you face? (e.g., distractions, difficult concepts, time management)"
              rows="3"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Productivity'}
          </button>
        </form>
      </div>

      {result && (
        <div className="card">
          {renderResult()}
        </div>
      )}
    </div>
  );
};

export default ProductivityAnalyzer;