import React, { useEffect, useState } from 'react';
import { auth } from '../lib/firebase-client';
import { getTrips, deleteTrip } from '../api';
import Navbar from './Navbar';

const DashboardPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const data = await getTrips(auth);
      setTrips(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    if (window.confirm('Delete this trip?')) {
      await deleteTrip(auth, tripId);
      fetchTrips();
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Your Trips</h1>
        {loading ? <p>Loading...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {trips.map(trip => (
              <div key={trip.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
                <h3>{trip.destination}</h3>
                <p><strong>From:</strong> {trip.source}</p>
                <p><strong>Dates:</strong> {trip.startDate} to {trip.endDate}</p>
                <p>{trip.description}</p>
                <button onClick={() => handleDelete(trip.id)} style={{ color: 'red' }}>Delete</button>
              </div>
            ))}
          </div>
        )}
        {!loading && trips.length === 0 && <p>No trips found. Add one!</p>}
      </div>
    </div>
  );
};

export default DashboardPage;
