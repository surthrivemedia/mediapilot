import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import logo from "../../stock/mediapilotlogo.png"

function Login() {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="login-container">
      {/* Left Side - Hero */}
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
            Build Credibility.  
            <br />
            Get Featured Anywhere.
          </h1>

          <p>
            MediaPilot helps creators, entrepreneurs, and brands publish press articles,
            manage campaigns, and grow their online presence effortlessly.  
            Run PR like a pro, all in one dashboard.
          </p>
        </div>

      </div>
    </div>

      {/* Right Side - Login Form */}
   <div className="login-form-container">
  <div className="login-card">
    
    <h2>Welcome Back CEO!</h2>
    <p className="subtitle">
      Jump back into your media planning.
    </p>

    <form className="login-form">
      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="checkmark"></span>
          Remember Me
        </label>

        <NavLink to="/reset-password" className="forgot-password">
          Forgot Password?
        </NavLink>
      </div>

      <button type="submit" className="login-btn">
        Log In
      </button>

      <div className="divider">
        <span></span> <p>Or continue with:</p> <span></span>
      </div>

      <button type="button" className="google-btn">
        <FcGoogle size={20} />
        Continue with Google
      </button>

      <p className="signup-text">
        Don’t have an account? <NavLink to="/signup">Sign up here</NavLink>
      </p>
    </form>

  </div>
</div>

    </div>
  );
};

export default Login
