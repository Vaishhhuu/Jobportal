import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicationService } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        fetchApplications(parsedUser.id);
      } catch (error) {
        setError('Please log in to view your applications');
        setLoading(false);
      }
    } else {
      setError('Please log in to view your applications');
      setLoading(false);
    }
  }, []);

  const fetchApplications = async (userId) => {
    try {
      setLoading(true);
      const response = await applicationService.getUserApplications(userId);
      setApplications(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#f59e0b';
      case 'REVIEWED': return '#3b82f6';
      case 'ACCEPTED': return '#10b981';
      case 'REJECTED': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return (
      <div className="my-applications">
        <div className="container">
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            Please <Link to="/login">log in</Link> to view your applications.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-applications">
      <div className="container">
        <div className="page-header">
          <h1>My Applications</h1>
          <p>Track the status of your job applications</p>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}

        {applications.length === 0 && !error ? (
          <div className="no-applications">
            <i className="fas fa-file-alt"></i>
            <h3>No Applications Yet</h3>
            <p>You haven't applied for any jobs yet.</p>
            <Link to="/" className="browse-jobs-btn">
              <i className="fas fa-search"></i>
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((application) => (
              <div key={application.id} className="application-card">
                <div className="application-header">
                  <div className="job-info">
                    <h3 className="job-title">
                      <Link to={`/job/${application.job.id}`}>
                        {application.job.title}
                      </Link>
                    </h3>
                    <p className="company-name">
                      <i className="fas fa-building"></i>
                      {application.job.company}
                    </p>
                    <p className="job-location">
                      <i className="fas fa-map-marker-alt"></i>
                      {application.job.location}
                    </p>
                  </div>
                  <div className="application-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(application.status) }}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>
                
                <div className="application-details">
                  <div className="detail-item">
                    <i className="fas fa-calendar"></i>
                    <span>Applied on {formatDate(application.appliedDate)}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-file"></i>
                    <span>Resume: {application.resumeFileName}</span>
                  </div>
                  {application.coverLetter && (
                    <div className="detail-item">
                      <i className="fas fa-envelope"></i>
                      <span>Cover letter included</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;