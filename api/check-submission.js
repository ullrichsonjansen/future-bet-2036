const { Redis } = require('@upstash/redis');
const jwt = require('jsonwebtoken');

const redis = Redis.fromEnv();
const JWT_SECRET = process.env.JWT_SECRET || 'future-bet-2036-super-secret-key';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Nicht autorisiert' });

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Ungültiger Token' });
  }

  try {
    const submission = await redis.get(`submission:${decoded.username}`);
    return res.status(200).json({ submitted: !!submission });
  } catch (error) {
    console.error('Error checking submission:', error);
    return res.status(500).json({ error: 'Fehler: ' + error.message });
  }
};
