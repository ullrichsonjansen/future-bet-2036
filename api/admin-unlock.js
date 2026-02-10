const { Redis } = require('@upstash/redis');

const redis = Redis.fromEnv();
const ADMIN_KEY = process.env.ADMIN_KEY;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { adminKey } = req.body;

  if (!ADMIN_KEY || !adminKey || adminKey !== ADMIN_KEY) {
    return res.status(403).json({ error: 'Ungültiger Admin-Key' });
  }

  try {
    await redis.set('results_unlocked', 'true');
    return res.status(200).json({ success: true, message: 'Ergebnisse erfolgreich freigeschaltet' });
  } catch (error) {
    console.error('Error unlocking results:', error);
    return res.status(500).json({ error: 'Fehler beim Freischalten: ' + error.message });
  }
};
