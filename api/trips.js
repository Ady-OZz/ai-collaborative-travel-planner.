const { db, verifyToken } = require('../lib/firebase-admin');

module.exports = async (req, res) => {
  // CORS support
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const decodedToken = await verifyToken(req, res);
  if (!decodedToken) return;

  const userId = decodedToken.uid;

  if (req.method === 'GET') {
    try {
      const tripsSnapshot = await db.collection('trips')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
      
      const trips = [];
      tripsSnapshot.forEach(doc => {
        trips.push({ id: doc.id, ...doc.data() });
      });
      
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const tripData = {
        ...req.body,
        userId,
        createdAt: new Date().toISOString()
      };
      const docRef = await db.collection('trips').add(tripData);
      res.status(201).json({ id: docRef.id, ...tripData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
