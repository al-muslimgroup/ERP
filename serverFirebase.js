/**
 * Firebase Server-Side Admin Synchronization Helper
 * Zero-dependency OAuth2 JWT & Firestore REST Client for Node.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const SA_FILE = path.join(__dirname, 'data', 'serviceAccountKey.json');

let cachedToken = null;
let tokenExpiresAt = 0;

function isServiceAccountAvailable() {
  return fs.existsSync(SA_FILE);
}

function getServiceAccount() {
  try {
    if (!fs.existsSync(SA_FILE)) return null;
    return JSON.parse(fs.readFileSync(SA_FILE, 'utf8'));
  } catch (err) {
    console.warn('[Firebase Server] Failed to read serviceAccountKey.json:', err.message);
    return null;
  }
}

async function getAdminAccessToken() {
  const sa = getServiceAccount();
  if (!sa) return null;

  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && tokenExpiresAt > now + 120) {
    return cachedToken;
  }

  return new Promise((resolve, reject) => {
    try {
      const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
      const claim = Buffer.from(JSON.stringify({
        iss: sa.client_email,
        scope: 'https://www.googleapis.com/auth/datastore',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now
      })).toString('base64url');

      const signer = crypto.createSign('RSA-SHA256');
      signer.update(header + '.' + claim);
      const signature = signer.sign(sa.private_key, 'base64url');
      const jwt = header + '.' + claim + '.' + signature;

      const postData = 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + jwt;
      const req = https.request('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, res => {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            if (parsed.access_token) {
              cachedToken = parsed.access_token;
              tokenExpiresAt = now + (parsed.expires_in || 3600);
              resolve(cachedToken);
            } else {
              reject(new Error(body));
            }
          } catch (e) {
            reject(e);
          }
        });
      });
      req.on('error', reject);
      req.write(postData);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Check if the Firestore database is created and ready
 */
async function checkFirestoreReady() {
  try {
    const token = await getAdminAccessToken();
    if (!token) return false;
    const sa = getServiceAccount();

    return new Promise(resolve => {
      const req = https.request(`https://firestore.googleapis.com/v1/projects/${sa.project_id}/databases/(default)`, {
        headers: { 'Authorization': 'Bearer ' + token }
      }, res => {
        resolve(res.statusCode === 200);
      });
      req.on('error', () => resolve(false));
      req.end();
    });
  } catch (_) {
    return false;
  }
}

module.exports = {
  isServiceAccountAvailable,
  getAdminAccessToken,
  checkFirestoreReady
};
