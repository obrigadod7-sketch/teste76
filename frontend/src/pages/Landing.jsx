import React from 'react';
import { Navigate } from 'react-router-dom';

// Landing just redirects to the main home page
const Landing = () => {
  return <Navigate to="/" replace />;
};

export default Landing;
