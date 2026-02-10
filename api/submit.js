const { Redis } = require('@upstash/redis');
const jwt = require('jsonwebtoken');

const redis = Redis.fromEnv();
const JWT_SECRET = process.env.JWT_SECRET || 'future-bet-2036-jwt-secret';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Support both "Bearer TOKEN" and plain "TOKEN"
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Nicht autorisiert' });
  
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Ungültiger Token: ' + error.message });
  }

  const username = decoded.username;
  const { answers } = req.body;

  if (!answers || Object.keys(answers).length === 0) {
    return res.status(400).json({ error: 'Keine Antworten übermittelt' });
  }

  try {
    const existing = await redis.get(`submission:${username}`);
    if (existing) {
      return res.status(400).json({ error: 'Du hast bereits abgestimmt!' });
    }

    const submission = {
      username,
      answers,
      timestamp: new Date().toISOString(),
      submitted: true
    };

    await redis.set(`submission:${username}`, JSON.stringify(submission));
    return res.status(200).json({ success: true, message: 'Antworten erfolgreich gespeichert' });
  } catch (error) {
    console.error('Error saving submission:', error);
    return res.status(500).json({ error: 'Fehler beim Speichern: ' + error.message });
  }
};
