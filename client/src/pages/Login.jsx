import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    clearError();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left side — branding */}
        <div className="auth-brand">
          <div className="auth-brand-content">
            <h1 className="auth-brand-title">🧠 Mitra 2.0</h1>
            <p className="auth-brand-tagline">
              Your AI-powered mental health companion for students
            </p>
            <div className="auth-brand-features">
              <div className="auth-brand-feature">
                <span className="feature-icon">💬</span>
                <span>AI Chat Support</span>
              </div>
              <div className="auth-brand-feature">
                <span className="feature-icon">📋</span>
                <span>Mental Health Screening</span>
              </div>
              <div className="auth-brand-feature">
                <span className="feature-icon">📅</span>
                <span>Counsellor Booking</span>
              </div>
              <div className="auth-brand-feature">
                <span className="feature-icon">🤝</span>
                <span>Peer Community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side — login form */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to continue your wellness journey</p>

            {error && (
              <div className="auth-error">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <p className="auth-switch">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="auth-switch-link">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
