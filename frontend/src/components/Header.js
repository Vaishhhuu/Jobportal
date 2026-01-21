import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    window.addEventListener('storage', checkUser);
    
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <i className="fas fa-briefcase"></i>
          <span>JobPortal</span>
        </Link>
        <nav className="nav">
          <Link to="/jobs" className="nav-link">Jobs</Link>
          {user && user.role === 'USER' && (
            <Link to="/my-applications" className="nav-link">My Applications</Link>
          )}
          {user && user.role === 'RECRUITER' && (
            <Link to="/recruiter-dashboard" className="nav-link">My Jobs</Link>
          )}
          {user && user.role === 'ADMIN' && (
            <Link to="/admin-dashboard" className="nav-link">Admin Panel</Link>
          )}
          {user ? (
            <div className="user-menu">
              <span className="user-info">
                <i className="fas fa-user"></i>
                {user.fullName} ({user.role})
              </span>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-link">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;