const { Redis } = require('@upstash/redis');

const redis = Redis.fromEnv();
const PARTICIPANTS = ['malin', 'veritas', 'tyrantitar', 'ulle', 'w4rhi'];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const statusPromises = PARTICIPANTS.map(async (username) => {
      const submission = await redis.get(`submission:${username}`);
      return { username, submitted: !!submission };
    });

    const participants = await Promise.all(statusPromises);
    const allDone = participants.every(p => p.submitted);
    const unlocked = await redis.get('results_unlocked');
    const deadline = new Date('2026-02-20T23:59:59');
    const deadlinePassed = new Date() > deadline;

    return res.status(200).json({
      participants,
      allDone,
      unlocked: !!unlocked || deadlinePassed,
      deadlinePassed
    });
  } catch (error) {
    console.error('Error fetching status:', error);
    return res.status(500).json({ error: 'Fehler beim Laden des Status: ' + error.message });
  }
};
