import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ROADMAPS = {
    'web-development': [
        'HTML & CSS Basics',
        'JavaScript Fundamentals',
        'Version Control (Git)',
        'React.js / Frontend Frameworks',
        'Node.js / Backend Basics',
        'Databases (MongoDB/SQL)',
        'Deploying Applications'
    ],
    'ai-ml': [
        'Python Programming',
        'NumPy & Pandas',
        'Data Visualization',
        'Machine Learning Basics (Scikit-Learn)',
        'Deep Learning (TensorFlow/PyTorch)',
        'Natural Language Processing',
        'Model Deployment'
    ],
    'data-science': [
        'Python & SQL',
        'Exploratory Data Analysis',
        'Statistics & Probability',
        'Data Wrangling',
        'Machine Learning',
        'Big Data Tools (Spark)',
        'Data Storytelling'
    ]
};

const Onboarding = ({ setUser }) => {
    const [language, setLanguage] = useState('English');
    const [goal, setGoal] = useState('web-development');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };

            const payload = {
                preferences: {
                    preferredLanguages: [language],
                    learningGoals: [goal]
                }
            };

            // We'll trust that the backend has an endpoint to update user details
            // If not, we might need to add one. For now, assuming /api/users/profile or similar.
            // Actually, let's use the /api/users/preferences endpoint if it exists, or create it.
            // Based on previous files, we can use /api/users/me or similar. 
            // Let's assume we need to create/use a route Update User Preferences.

            // Let's implement the route in the backend next if it doesn't exist.
            // For now, let's assume we post to /api/users/preferences
            await axios.put('/api/users/preferences', payload, config);

            // Update local user state if needed (optional, as dashboard will re-fetch)
            navigate('/');
        } catch (err) {
            console.error("Error saving preferences", err);
            alert("Failed to save preferences. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: '800px', margin: '40px auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Welcome to AI for Bharat! 🇮🇳</h1>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Let's personalize your learning journey.</p>

                <div className="form-group">
                    <label><strong>1. Preferred Language of Instruction</strong></label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="form-control"
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                    >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi (हिंदी)</option>
                        <option value="Tamil">Tamil (தமிழ்)</option>
                        <option value="Telugu">Telugu (తెలుగు)</option>
                        <option value="Bengali">Bengali (বাংলা)</option>
                        <option value="Marathi">Marathi (मराठी)</option>
                    </select>
                </div>

                <div className="form-group" style={{ marginTop: '20px' }}>
                    <label><strong>2. What is your primary learning goal?</strong></label>
                    <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="form-control"
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                    >
                        <option value="web-development">Full Stack Web Development</option>
                        <option value="ai-ml">Artificial Intelligence & Machine Learning</option>
                        <option value="data-science">Data Science & Analytics</option>
                    </select>
                </div>

                <div className="roadmap-preview" style={{ marginTop: '30px', background: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
                    <h3 style={{ marginBottom: '15px' }}>🚀 Your Projected Roadmap</h3>
                    <div className="timeline">
                        {ROADMAPS[goal].map((step, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{
                                    background: '#2ecc71',
                                    color: 'white',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                    fontWeight: 'bold'
                                }}>{index + 1}</div>
                                <div style={{ fontSize: '1.1rem' }}>{step}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="btn"
                    style={{ marginTop: '30px', width: '100%', padding: '15px', fontSize: '1.2rem' }}
                >
                    {loading ? 'Saving Profile...' : 'Start My Journey 🚀'}
                </button>
            </div>
        </div>
    );
};

export default Onboarding;
