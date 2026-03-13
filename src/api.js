const API_BASE = '/api';

const getHeaders = async (auth) => {
  const token = await auth.currentUser?.getIdToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const getTrips = async (auth) => {
  const response = await fetch(`${API_BASE}/trips`, {
    headers: await getHeaders(auth)
  });
  return response.json();
};

export const createTrip = async (auth, tripData) => {
  const response = await fetch(`${API_BASE}/trips`, {
    method: 'POST',
    headers: await getHeaders(auth),
    body: JSON.stringify(tripData)
  });
  return response.json();
};

export const deleteTrip = async (auth, tripId) => {
  const response = await fetch(`${API_BASE}/trips-tripId?tripId=${tripId}`, {
    method: 'DELETE',
    headers: await getHeaders(auth)
  });
  return response.json();
};

export const generateAITrip = async (auth, data) => {
  const response = await fetch(`${API_BASE}/ai-itinerary`, {
    method: 'POST',
    headers: await getHeaders(auth),
    body: JSON.stringify(data)
  });
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE}/auth-register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};
