import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase-client';
import { createTrip } from '../api';
import Navbar from './Navbar';

const AddTripForm = () => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTrip(auth, formData);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Failed to add trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
        <h2>Add New Trip</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Source" value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} required />
          <input type="text" placeholder="Destination" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} required />
          <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
          <input type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} required />
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Trip'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddTripForm;
