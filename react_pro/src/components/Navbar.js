
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('jwtToken');

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">Home</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav d-flex flex-row gap-4">
            <li className="nav-item"><Link className="nav-link text-white" to="/assets">Assets</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/maintenance">Maintenance</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/workorder">Work Order</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/technicians">Technicians</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/assign">Assign</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/assignments">Assignments</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/report">Report</Link></li>
          </ul>
        </div>

        <div className="d-flex">
          {isLoggedIn ? (
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">
              <button className="btn btn-warning">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
