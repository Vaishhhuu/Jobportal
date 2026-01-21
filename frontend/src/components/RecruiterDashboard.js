import React, { useState, useEffect } from 'react';
import { recruiterService, applicationService } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '', company: '', location: '', type: 'Full-time',
    description: '', skills: '', salaryRange: '', applicationDeadline: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchMyJobs(parsedUser.id);
    }
  }, []);

  const fetchMyJobs = async (recruiterId) => {
    try {
      const response = await recruiterService.getMyJobs(recruiterId);
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!jobForm.title || !jobForm.company || !jobForm.location || !jobForm.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate deadline is not in the past
    if (jobForm.applicationDeadline && new Date(jobForm.applicationDeadline) < new Date()) {
      alert('Application deadline cannot be in the past');
      return;
    }
    
    try {
      const jobData = {
        title: jobForm.title,
        company: jobForm.company,
        location: jobForm.location,
        type: jobForm.type,
        description: jobForm.description,
        skills: jobForm.skills ? jobForm.skills.split(',').map(s => s.trim()) : [],
        salaryRange: jobForm.salaryRange,
        applicationDeadline: jobForm.applicationDeadline || null
      };
      
      await recruiterService.createJob(user.id, jobData);
      setShowJobForm(false);
      setJobForm({
        title: '', company: '', location: '', type: 'Full-time',
        description: '', skills: '', salaryRange: '', applicationDeadline: ''
      });
      fetchMyJobs(user.id);
      alert('Job posted successfully! It will be visible after admin approval.');
    } catch (error) {
      console.error('Failed to create job:', error);
      const errorMessage = error.response?.data?.error || 'Failed to create job. Please try again.';
      alert(errorMessage);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#f59e0b';
      case 'APPROVED': return '#10b981';
      case 'REJECTED': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="recruiter-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Recruiter Dashboard</h1>
          <button 
            className="post-job-btn"
            onClick={() => setShowJobForm(true)}
          >
            <i className="fas fa-plus"></i>
            Post New Job
          </button>
        </div>

        {showJobForm && (
          <div className="modal-overlay">
            <div className="modal job-form-modal">
              <div className="modal-header">
                <h2>Post New Job</h2>
                <button onClick={() => setShowJobForm(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleJobSubmit} className="job-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      value={jobForm.title}
                      onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Company *</label>
                    <input
                      type="text"
                      value={jobForm.company}
                      onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      value={jobForm.location}
                      onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Job Type *</label>
                    <select
                      value={jobForm.type}
                      onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={jobForm.description}
                    onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                    rows="4"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={jobForm.skills}
                    onChange={(e) => setJobForm({...jobForm, skills: e.target.value})}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Salary Range</label>
                    <input
                      type="text"
                      value={jobForm.salaryRange}
                      onChange={(e) => setJobForm({...jobForm, salaryRange: e.target.value})}
                      placeholder="$50,000 - $70,000"
                    />
                  </div>
                  <div className="form-group">
                    <label>Application Deadline</label>
                    <input
                      type="date"
                      value={jobForm.applicationDeadline}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setJobForm({...jobForm, applicationDeadline: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowJobForm(false)}>Cancel</button>
                  <button type="submit">Post Job</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="jobs-list">
          {jobs.map(job => (
            <div key={job.id} className="job-card recruiter-job">
              <div className="job-header">
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.company} - {job.location}</p>
                </div>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(job.status) }}
                >
                  {job.status}
                </span>
              </div>
              <p className="job-type">{job.type}</p>
              <p className="posted-date">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
            </div>
          ))}
          {jobs.length === 0 && (
            <div className="no-jobs">
              <i className="fas fa-briefcase"></i>
              <p>No jobs posted yet. Click "Post New Job" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;