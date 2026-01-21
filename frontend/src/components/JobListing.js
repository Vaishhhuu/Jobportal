import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getAllJobs();
      setJobs(response.data);
      setError('');
    } catch (err) {
      setError('Unable to load job listings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      fetchJobs();
      return;
    }

    try {
      setSearching(true);
      const response = await jobService.searchJobs(searchKeyword);
      setJobs(response.data);
      setError('');
      if (response.data.length === 0) {
        setError('No jobs found matching your search criteria.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setSearching(false);
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

  return (
    <div className="job-listing">
      <div className="container">
        <div className="search-section">
          <h1>Find Your Dream Job</h1>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search jobs by title, company, or location..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn" disabled={searching}>
                {searching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}

        <div className="jobs-grid">
          {jobs.map((job) => (
            <Link to={`/job/${job.id}`} key={job.id} className="job-card">
              <div className="job-header">
                <h3 className="job-title">{job.title}</h3>
                <span className="job-type">{job.type}</span>
              </div>
              <div className="job-company">
                <i className="fas fa-building"></i>
                {job.company}
              </div>
              <div className="job-location">
                <i className="fas fa-map-marker-alt"></i>
                {job.location}
              </div>
              <div className="job-skills">
                {job.skills && job.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
                {job.skills && job.skills.length > 3 && (
                  <span className="skill-tag more">+{job.skills.length - 3} more</span>
                )}
              </div>
              <div className="job-footer">
                <span className="job-date">
                  <i className="fas fa-calendar"></i>
                  Posted {formatDate(job.postedDate)}
                </span>
                <span className="job-salary">{job.salaryRange}</span>
              </div>
            </Link>
          ))}
        </div>

        {jobs.length === 0 && !error && !loading && (
          <div className="no-jobs">
            <i className="fas fa-briefcase"></i>
            <p>No jobs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;