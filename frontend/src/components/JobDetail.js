import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobService } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ApplicationForm from './ApplicationForm';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    fetchJobDetail();
  }, [id]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await jobService.getJobById(id);
      setJob(response.data);
      setError('');
    } catch (err) {
      setError('Unable to load job details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleApplicationSuccess = () => {
    setShowApplicationForm(false);
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="job-detail">
        <div className="container">
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
          <Link to="/jobs" className="back-btn">
            <i className="fas fa-arrow-left"></i>
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="job-detail">
      <div className="container">
        <Link to="/jobs" className="back-btn">
          <i className="fas fa-arrow-left"></i>
          Back to Listings
        </Link>

        <div className="job-detail-card">
          <div className="job-header">
            <div className="job-title-section">
              <h1 className="job-title">{job.title}</h1>
              <span className="job-type">{job.type}</span>
            </div>
            {(() => {
              const userData = localStorage.getItem('user');
              const user = userData ? JSON.parse(userData) : null;
              
              if (!user) {
                return (
                  <Link to="/login" className="apply-btn">
                    <i className="fas fa-sign-in-alt"></i>
                    Login to Apply
                  </Link>
                );
              }
              
              if (user.role !== 'USER') {
                return (
                  <div className="role-message">
                    <i className="fas fa-info-circle"></i>
                    Only job seekers can apply for jobs
                  </div>
                );
              }
              
              return (
                <button 
                  className="apply-btn"
                  onClick={() => setShowApplicationForm(true)}
                >
                  <i className="fas fa-paper-plane"></i>
                  Apply Now
                </button>
              );
            })()}
          </div>

          <div className="job-meta">
            <div className="meta-item">
              <i className="fas fa-building"></i>
              <span>{job.company}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{job.location}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-calendar"></i>
              <span>Posted on {formatDate(job.postedDate)}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-dollar-sign"></i>
              <span>{job.salaryRange}</span>
            </div>
            {job.applicationDeadline && (
              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <span>Apply by {formatDate(job.applicationDeadline)}</span>
              </div>
            )}
          </div>

          <div className="job-content">
            <section className="job-description">
              <h2>Job Description</h2>
              <p>{job.description}</p>
            </section>

            {job.skills && job.skills.length > 0 && (
              <section className="job-skills">
                <h2>Required Skills</h2>
                <div className="skills-list">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {showApplicationForm && (
          <ApplicationForm
            jobId={job.id}
            jobTitle={job.title}
            onClose={() => setShowApplicationForm(false)}
            onSuccess={handleApplicationSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default JobDetail;