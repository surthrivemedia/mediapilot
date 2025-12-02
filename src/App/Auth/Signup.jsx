import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import logo from '../../stock/mediapilotlogo.png';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { strength: 0, label: '', color: '' };
    if (pwd.length < 6) return { strength: 1, label: 'Weak', color: '#ef4444' };
    if (pwd.length < 10) return { strength: 2, label: 'Medium', color: '#f59e0b' };
    return { strength: 3, label: 'Strong', color: '#22c55e' };
  };

  const { strength, label, color } = passwordStrength();
  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;

  return (
    <div className="login-container">
      {/* Left Side - Hero (same as Login) */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="logo">
            <img src={logo} alt="Media Pilot Logo" />
            <NavLink to="/" className="back-link">
              ← Back to Website
            </NavLink>
          </div>

          <div className="hero-content">
            <h1>
              Your story matters. <br />
               Let’s help people see it.
            </h1>
            <p>
              Plan, create, and publish your media content in one place. MediaPilot gives you the tools to grow your brand and stay visible without stress.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="login-form-container">
        <div className="login-card">
          <h2>Create Your Account</h2>
          <p className="subtitle">
            Start building your media presence today.
          </p>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className="fill"
                      style={{
                        width: `${(strength / 3) * 100}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                  <span style={{ color }}>{label}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    borderColor:
                      formData.confirmPassword && !passwordsMatch ? '#ef4444' : undefined,
                  }}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="error-text">Passwords do not match</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <label className="checkbox-label terms">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <span className="checkmark"></span>
              I agree to the{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </label>

            <button
              type="submit"
              className="login-btn"
              disabled={!agreeTerms || !passwordsMatch || !formData.fullName || !formData.email}
            >
              Create Account
            </button>

            <div className="divider">
              <span></span> <p>Or sign up with:</p> <span></span>
            </div>

            <button type="button" className="google-btn">
              <FcGoogle size={20} />
              Continue with Google
            </button>

            <p className="signup-text">
              Already have an account?{' '}
              <NavLink to="/login">Log in here</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;