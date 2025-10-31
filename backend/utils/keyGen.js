// generateJWTSecret.js
const crypto = require('crypto');

function generateJWTSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

console.log('JWT_SECRET=' + generateJWTSecret());
