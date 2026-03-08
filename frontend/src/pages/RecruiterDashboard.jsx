import React from 'react';
import { Navigate } from 'react-router-dom';

const RecruiterDashboard = () => {
    // Recruiter just needs exactly what verification page offers, 
    // so we can redirect them to the public verification page for simplicity,
    // or render it out here if more private features are added later.
    return <Navigate to="/verify" replace />;
};

export default RecruiterDashboard;
