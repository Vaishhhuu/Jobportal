
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobService = {
  getAllJobs: () => api.get('/jobs'),
  getJobById: (id) => api.get(`/jobs/${id}`),
  searchJobs: (keyword) => api.get(`/jobs/search?keyword=${encodeURIComponent(keyword)}`),
  createJob: (jobData) => api.post('/jobs', jobData),
};

export const applicationService = {
  submitApplication: (jobId, userId, applicationData) => api.post(`/applications/job/${jobId}?userId=${userId}`, applicationData),
  getApplicationsByJobId: (jobId) => api.get(`/applications/job/${jobId}`),
  getUserApplications: (userId) => api.get(`/applications/user/${userId}`),
};

export const authService = {
  login: (loginData) => api.post('/auth/login', loginData),
  register: (registerData) => api.post('/auth/register', registerData),
};

export const adminService = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getPendingRecruiters: () => api.get('/admin/recruiters/pending'),
  getPendingJobs: () => api.get('/admin/jobs/pending'),
  approveRecruiter: (id) => api.put(`/admin/recruiters/${id}/approve`),
  rejectRecruiter: (id) => api.put(`/admin/recruiters/${id}/reject`),
  approveJob: (id) => api.put(`/admin/jobs/${id}/approve`),
  rejectJob: (id) => api.put(`/admin/jobs/${id}/reject`),
};

export const recruiterService = {
  getMyJobs: (recruiterId) => api.get(`/jobs/recruiter/${recruiterId}`),
  createJob: (recruiterId, jobData) => {
    console.log('Creating job with data:', jobData);
    console.log('Recruiter ID:', recruiterId);
    return api.post(`/jobs?recruiterId=${recruiterId}`, jobData);
  },
};

export default api;