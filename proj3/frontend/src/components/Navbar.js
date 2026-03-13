import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase-client';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/dashboard" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/ai-planner" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>AI Planner</Link>
        <Link to="/add-trip" style={{ color: '#fff', textDecoration: 'none' }}>Add Trip</Link>
      </div>
      <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Logout</button>
    </nav>
  );
};

export default Navbar;
