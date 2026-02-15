import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Check for Google Auth Token in URL
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const authError = params.get('error');

    if (token) {
      localStorage.setItem('token', token);
      // Force reload to trigger App.jsx's auth check
      window.location.href = '/';
    }

    if (authError) {
      setError('Google Authentication failed. Please try again.');
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Store token and user info
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);

      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="container">
      <div className="card auth-card">
        <h2>Login to AI for Bharat</h2>

        {error && <div className="error">{error}</div>}

        <button
          type="button"
          className="btn"
          style={{ backgroundColor: '#db4437', marginBottom: '20px' }}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>

        <div style={{ textAlign: 'center', margin: '10px 0' }}>OR</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <p className="auth-link">
          Forgot password? <Link to="/forgot-password">Reset it</Link>
        </p>

        <div style={{ textAlign: 'center', margin: '20px 0 10px' }}>OR</div>

        <button
          type="button"
          className="btn"
          style={{ backgroundColor: '#db4437', marginTop: '10px' }}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;