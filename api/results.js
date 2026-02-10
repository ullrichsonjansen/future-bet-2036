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
    const unlocked = await redis.get('results_unlocked');
    const deadline = new Date('2026-02-20T23:59:59');
    const deadlinePassed = new Date() > deadline;

    if (!unlocked && !deadlinePassed) {
      return res.status(403).json({ error: 'Ergebnisse noch nicht freigeschaltet' });
    }

    const submissionPromises = PARTICIPANTS.map(async (username) => {
      const submissionData = await redis.get(`submission:${username}`);
      if (submissionData) {
        return typeof submissionData === 'string' ? JSON.parse(submissionData) : submissionData;
      }
      return null;
    });

    const submissions = await Promise.all(submissionPromises);
    const validSubmissions = submissions.filter(s => s !== null);

    return res.status(200).json({ submissions: validSubmissions, total: validSubmissions.length });
  } catch (error) {
    console.error('Error fetching results:', error);
    return res.status(500).json({ error: 'Fehler beim Laden der Ergebnisse: ' + error.message });
  }
};
