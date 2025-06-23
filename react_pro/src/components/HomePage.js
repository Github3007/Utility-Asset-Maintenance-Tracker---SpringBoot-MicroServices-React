// src/components/HomePage.js
import React from 'react';
import '../components/HomePage.css'


const HomePage = () => {
  const modules = [
    {
      title: 'Asset Registration & Hierarchy Management',
      description: 'Register and organize utility assets across locations.',
    },
    {
      title: 'Maintenance Schedule Configuration',
      description: 'Set up recurring preventive maintenance plans.',
    },
    {
      title: 'Work Order Management',
      description: 'Create, track, and update maintenance work orders.',
    },
    {
      title: 'Technician Assignment & Tracking',
      description: 'Assign technicians based on skills and availability.',
    },
    {
      title: 'Reporting and Compliance Logs',
      description: 'View reports on maintenance history and compliance.',
    },
  ];

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-5">Utility Asset Management System</h1>
        <p className="lead">Welcome! </p>
      </div>
      <div className="row">
        {modules.map((mod, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title"> {mod.title}</h5>
                <p className="card-text">{mod.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
