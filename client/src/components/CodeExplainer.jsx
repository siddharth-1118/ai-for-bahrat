import React, { useState } from 'react';
import axios from 'axios';

const CodeExplainer = () => {
  const [codeInput, setCodeInput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/learning/explain-code', {
        code: codeInput,
        language
      });
      setResult(response.data);
    } catch (err) {
      setError('Failed to explain code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Code Explainer</h1>
      <p>Get detailed explanations of code snippets in any programming language</p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="language">Programming Language</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="code">Code Snippet</label>
            <textarea
              id="code"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder={`Paste your code here...
Example:
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`}
              rows="10"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Analyzing Code...' : 'Explain Code'}
          </button>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="card">
          <h2>Code Explanation</h2>
          
          <div className="explanation-section">
            <h3>What This Code Does</h3>
            <p>{result.explanation || result.description || 'No explanation available.'}</p>
          </div>

          <div className="explanation-section">
            <h3>Key Concepts Used</h3>
            <ul className="concept-list">
              {(result.concepts || []).map((concept, index) => (
                <li key={index}>{concept}</li>
              ))}
            </ul>
          </div>

          <div className="explanation-section">
            <h3>Best Practices Demonstrated</h3>
            <ul className="best-practices-list">
              {(result.bestPractices || []).map((practice, index) => (
                <li key={index}>{practice}</li>
              ))}
            </ul>
          </div>

          {result.improvements && result.improvements.length > 0 && (
            <div className="explanation-section">
              <h3>Potential Improvements</h3>
              <ul className="improvements-list">
                {result.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeExplainer;