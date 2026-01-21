import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const userData = localStorage.getItem('user');
  
  if (!userData) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const user = JSON.parse(userData);
    
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  } catch (error) {
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }
};

export default RoleBasedRoute;