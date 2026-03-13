const { verifyToken } = require('../lib/firebase-admin');
const { generateItinerary } = require('../lib/gemini');

module.exports = async (req, res) => {
  // CORS support
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const decodedToken = await verifyToken(req, res);
  if (!decodedToken) return;

  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { destination, days } = req.body;

  if (!destination || !days) {
    res.status(400).json({ error: "Destination and days are required" });
    return;
  }

  if (days > 14) {
    return res.status(400).json({ error: "Max 14 days allowed" });
  }

  try {
    const itinerary = await generateItinerary(destination, days);
    res.status(200).json({ itinerary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
