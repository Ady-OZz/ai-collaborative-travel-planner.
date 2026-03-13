const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    })
  });
}

async function verifyToken(req, res) {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res.status(401).json({ error: "No token" });
    return null;
  }
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (e) {
    console.error("Token verification error:", e);
    res.status(401).json({ error: "Invalid token" });
    return null;
  }
}

module.exports = {
  db: admin.firestore(),
  auth: admin.auth(),
  verifyToken
};
