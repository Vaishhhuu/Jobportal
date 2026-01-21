import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import JobListing from './components/JobListing';
import JobDetail from './components/JobDetail';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import MyApplications from './components/MyApplications';
import AdminDashboard from './components/AdminDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import RoleBasedRoute from './components/RoleBasedRoute';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/jobs" element={<JobListing />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-applications" element={
              <RoleBasedRoute allowedRoles={['USER']}>
                <MyApplications />
              </RoleBasedRoute>
            } />
            <Route path="/admin-dashboard" element={
              <RoleBasedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </RoleBasedRoute>
            } />
            <Route path="/recruiter-dashboard" element={
              <RoleBasedRoute allowedRoles={['RECRUITER']}>
                <RecruiterDashboard />
              </RoleBasedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;