import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    universityId: '',
    universityName: '',
    department: '',
    yearOfStudy: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    clearError();
    setLocalError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...submitData } = formData;
      // Convert yearOfStudy to number if provided
      if (submitData.yearOfStudy) {
        submitData.yearOfStudy = parseInt(submitData.yearOfStudy, 10);
      }
      await register(submitData);
      navigate('/');
    } catch (err) {
      // Error handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = localError || error;

  return (
    <div className="auth-page">
      <div className="auth-container auth-container-register">
        {/* Left side — branding */}
        <div className="auth-brand">
          <div className="auth-brand-content">
            <h1 className="auth-brand-title">🧠 Mitra 2.0</h1>
            <p className="auth-brand-tagline">
              Join thousands of students taking charge of their mental wellness
            </p>
            <div className="auth-brand-features">
              <div className="auth-brand-feature">
                <span className="feature-icon">🔒</span>
                <span>100% Anonymous & Confidential</span>
              </div>
              <div className="auth-brand-feature">
                <span className="feature-icon">🎓</span>
                <span>Built for University Students</span>
              </div>
              <div className="auth-brand-feature">
                <span className="feature-icon">🤖</span>
                <span>AI-Powered Support 24/7</span>
              </div>
              <div className="auth-brand-feature">
                <span className="feature-icon">❤️</span>
                <span>Free & Accessible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side — register form */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Start your mental wellness journey today</p>

            {displayError && (
              <div className="auth-error">
                <span className="error-icon">⚠️</span>
                {displayError}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              {/* Email */}
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
                />
              </div>

              {/* University fields — side by side */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="universityId">University ID</label>
                  <input
                    type="text"
                    id="universityId"
                    name="universityId"
                    placeholder="e.g., STU2024001"
                    value={formData.universityId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="universityName">University Name</label>
                  <input
                    type="text"
                    id="universityName"
                    name="universityName"
                    placeholder="e.g., BPUT"
                    value={formData.universityName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Department & Year — side by side */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="e.g., Computer Science"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="yearOfStudy">Year of Study</label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                  >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                    <option value="6">6th Year</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Min. 6 characters"
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

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{' '}
              <Link to="/login" className="auth-switch-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
