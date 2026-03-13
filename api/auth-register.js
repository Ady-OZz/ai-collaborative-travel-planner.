const { auth } = require('../lib/firebase-admin');

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

  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, password, displayName } = req.body;

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName
    });
    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
