const jwt = require('jsonwebtoken');

// Secret codes loaded from Vercel Environment Variables (NEVER hardcode these!)
const SECRETS = {
  'malin': process.env.CODE_MALIN,
  'veritas': process.env.CODE_VERITAS,
  'tyrantitar': process.env.CODE_TYRANTITAR,
  'ulle': process.env.CODE_ULLE,
  'w4rhi': process.env.CODE_W4RHI
};

const JWT_SECRET = process.env.JWT_SECRET || 'future-bet-2036-jwt-secret';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, code } = req.body;

  if (!username || !code) {
    return res.status(400).json({ error: 'Username und Code erforderlich' });
  }

  const normalizedUsername = username.toLowerCase().trim();

  if (!SECRETS[normalizedUsername]) {
    return res.status(401).json({ error: 'Ungültiger Benutzername' });
  }

  if (!SECRETS[normalizedUsername] || SECRETS[normalizedUsername].toUpperCase() !== code.toUpperCase().trim()) {
    return res.status(401).json({ error: 'Falscher Secret Code' });
  }

  const token = jwt.sign(
    { username: normalizedUsername },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.status(200).json({
    success: true,
    token,
    username: normalizedUsername
  });
};
