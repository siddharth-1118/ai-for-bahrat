import React, { useState } from 'react';
import axios from 'axios';

const LearningPath = () => {
  const [formData, setFormData] = useState({
    skill: '',
    experienceLevel: 'beginner',
    goals: '',
    timeframe: 8
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/learning/path', formData);
      setResult(response.data);
    } catch (err) {
      setError('Failed to generate learning path. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Personalized Learning Path</h1>
      <p>Generate a customized learning journey tailored to your skills and goals</p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="skill">Skill to Learn</label>
              <input
                type="text"
                id="skill"
                value={formData.skill}
                onChange={(e) => setFormData({...formData, skill: e.target.value})}
                placeholder="e.g., JavaScript, Python, React, etc."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="experienceLevel">Experience Level</label>
              <select
                id="experienceLevel"
                value={formData.experienceLevel}
                onChange={(e) => setFormData({...formData, experienceLevel: e.target.value})}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="goals">Learning Goals</label>
            <textarea
              id="goals"
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              placeholder="What do you want to achieve? (e.g., build web apps, get a job, contribute to open source)"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="timeframe">Time Frame (weeks)</label>
            <input
              type="number"
              id="timeframe"
              value={formData.timeframe}
              onChange={(e) => setFormData({...formData, timeframe: parseInt(e.target.value)})}
              min="1"
              max="52"
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Learning Path'}
          </button>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="card">
          <h2>Your Personalized Learning Path</h2>
          
          <div className="learning-path-content">
            <h3>Weekly Milestones</h3>
            <div className="milestones">
              {result.weeks && result.weeks.map((week, index) => (
                <div key={index} className="milestone">
                  <h4>Week {index + 1}: {week.title || week.topic}</h4>
                  <p>{week.description || week.goal}</p>
                </div>
              ))}
            </div>

            <h3>Resources</h3>
            <ul className="resources-list">
              {result.resources && result.resources.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>

            <h3>Practice Projects</h3>
            <div className="projects">
              {result.projects && result.projects.map((project, index) => (
                <div key={index} className="project">
                  <h4>{project.title || project.name}</h4>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPath;