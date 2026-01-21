import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      navigate('/jobs');
    }
  }, [navigate]);

  return (
    <div className="welcome-section">
      <div className="container">
        <div className="welcome-content">
          <h1>Welcome to JobPortal</h1>
          <p>Your gateway to career opportunities</p>
          
          <div className="features">
            <div className="feature-card">
              <i className="fas fa-search"></i>
              <h3>Find Jobs</h3>
              <p>Search thousands of job opportunities from top companies</p>
            </div>
            
            <div className="feature-card">
              <i className="fas fa-user-tie"></i>
              <h3>For Recruiters</h3>
              <p>Post jobs and find the perfect candidates for your company</p>
            </div>
            
            <div className="feature-card">
              <i className="fas fa-chart-line"></i>
              <h3>Track Progress</h3>
              <p>Monitor your applications and career growth</p>
            </div>
          </div>
          
          <div className="welcome-actions">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;