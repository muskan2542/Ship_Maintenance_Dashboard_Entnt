import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/main.css'; // adjust path if needed

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                <Link to="/ships" className="navbar-link">Ships</Link>
                <Link to="/components" className="navbar-link">Components</Link>
                <Link to="/jobs" className="navbar-link">Jobs</Link>
                <Link to="/jobcalendar" className="navbar-link">Calendar</Link>
            </div>
            <button onClick={handleLogout} className="navbar-logout-btn">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
