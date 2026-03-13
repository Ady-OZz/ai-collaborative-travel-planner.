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

  // Extract tripId from URL - Vercel handles this via routes in vercel.json
  // But for this specific file, we expect it in the query
  const { tripId } = req.query;

  if (req.method === 'PUT') {
    try {
      await db.collection('trips').doc(tripId).update(req.body);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await db.collection('trips').doc(tripId).delete();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
