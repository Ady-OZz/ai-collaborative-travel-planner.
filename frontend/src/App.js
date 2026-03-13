import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase-client';
import LoginSignInPage from './LoginSignInPage';
import DashboardPage from './components/DashboardPage';
import AddTripForm from './components/AddTripForm';
import AIPlanner from './components/AIPlanner';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading Application...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <LoginSignInPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/add-trip" element={user ? <AddTripForm /> : <Navigate to="/login" />} />
        <Route path="/ai-planner" element={user ? <AIPlanner /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
