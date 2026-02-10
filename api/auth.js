const jwt = require('jsonwebtoken');

// Secret codes for participants
const SECRETS = {
  'malin': 'QUANTUM-7294',
  'veritas': 'NEURAL-5831',
  'tyrantitar': 'FUSION-9156',
  'ulle': 'MATRIX-4672',
  'w4rhi': 'CYBER-8403'
};

const JWT_SECRET = process.env.JWT_SECRET || 'future-bet-2036-super-secret-key';

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, code } = req.body;

  if (!username || !code) {
    return res.status(400).json({ error: 'Username und Code erforderlich' });
  }

  // Normalize username
  const normalizedUsername = username.toLowerCase().trim();

  // Check if user exists
  if (!SECRETS[normalizedUsername]) {
    return res.status(401).json({ error: 'Ungültiger Benutzername' });
  }

  // Validate code (case-insensitive)
  if (SECRETS[normalizedUsername].toUpperCase() !== code.toUpperCase().trim()) {
    return res.status(401).json({ error: 'Falscher Secret Code' });
  }

  // Generate JWT token
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
