import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [pendingRecruiters, setPendingRecruiters] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, recruitersRes, jobsRes] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getPendingRecruiters(),
        adminService.getPendingJobs()
      ]);
      
      setStats(statsRes.data);
      setPendingRecruiters(recruitersRes.data);
      setPendingJobs(jobsRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecruiterAction = async (id, action) => {
    try {
      if (action === 'approve') {
        await adminService.approveRecruiter(id);
      } else {
        await adminService.rejectRecruiter(id);
      }
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to update recruiter:', error);
    }
  };

  const handleJobAction = async (id, action) => {
    try {
      if (action === 'approve') {
        await adminService.approveJob(id);
      } else {
        await adminService.rejectJob(id);
      }
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="admin-tabs">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'recruiters' ? 'active' : ''}
            onClick={() => setActiveTab('recruiters')}
          >
            Pending Recruiters ({pendingRecruiters.length})
          </button>
          <button 
            className={activeTab === 'jobs' ? 'active' : ''}
            onClick={() => setActiveTab('jobs')}
          >
            Pending Jobs ({pendingJobs.length})
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="stats-grid">
            <div className="stat-card">
              <i className="fas fa-users"></i>
              <div>
                <h3>{stats.totalUsers}</h3>
                <p>Total Users</p>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-briefcase"></i>
              <div>
                <h3>{stats.totalJobs}</h3>
                <p>Total Jobs</p>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-file-alt"></i>
              <div>
                <h3>{stats.totalApplications}</h3>
                <p>Total Applications</p>
              </div>
            </div>
            <div className="stat-card pending">
              <i className="fas fa-clock"></i>
              <div>
                <h3>{stats.pendingRecruiters}</h3>
                <p>Pending Recruiters</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recruiters' && (
          <div className="pending-list">
            {pendingRecruiters.map(recruiter => (
              <div key={recruiter.id} className="pending-item">
                <div className="item-info">
                  <h3>{recruiter.fullName}</h3>
                  <p>{recruiter.email}</p>
                  <small>Registered: {new Date(recruiter.createdAt).toLocaleDateString()}</small>
                </div>
                <div className="item-actions">
                  <button 
                    className="approve-btn"
                    onClick={() => handleRecruiterAction(recruiter.id, 'approve')}
                  >
                    Approve
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleRecruiterAction(recruiter.id, 'reject')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {pendingRecruiters.length === 0 && (
              <p className="no-items">No pending recruiters</p>
            )}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="pending-list">
            {pendingJobs.map(job => (
              <div key={job.id} className="pending-item">
                <div className="item-info">
                  <h3>{job.title}</h3>
                  <p>{job.company} - {job.location}</p>
                  <small>Posted: {new Date(job.postedDate).toLocaleDateString()}</small>
                </div>
                <div className="item-actions">
                  <button 
                    className="approve-btn"
                    onClick={() => handleJobAction(job.id, 'approve')}
                  >
                    Approve
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleJobAction(job.id, 'reject')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {pendingJobs.length === 0 && (
              <p className="no-items">No pending jobs</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;