import React, { useState } from 'react';
import { auth } from '../lib/firebase-client';
import { generateAITrip } from '../api';
import Navbar from './Navbar';

const AIPlanner = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(1);
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateAITrip(auth, { destination, days });
      setItinerary(data.itinerary);
    } catch (error) {
      console.error(error);
      alert('Failed to generate itinerary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        <h2>AI Trip Planner</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" placeholder="Where to?" value={destination} onChange={(e) => setDestination(e.target.value)} />
          <input type="number" min="1" max="14" value={days} onChange={(e) => setDays(e.target.value)} />
          <button onClick={handleGenerate} disabled={loading}>{loading ? 'Generating...' : 'Generate Itinerary'}</button>
        </div>
        {itinerary && (
          <div style={{ backgroundColor: '#f4f4f4', padding: '1.5rem', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
            <h3>Your Itinerary</h3>
            {itinerary}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;
