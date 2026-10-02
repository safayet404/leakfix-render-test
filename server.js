// Tiny app for testing leakfix against a real Render service.
// /health shows a fingerprint of the JWT secrets (never the secrets), so you can
// see that a rotation reached the running app.
const http = require('http');
const crypto = require('crypto');

const fingerprint = (v) => (v ? crypto.createHash('sha256').update(v).digest('hex').slice(0, 8) : null);

http.createServer((req, res) => {
  if (req.url === '/health') {
    const ok = Boolean(process.env.JWT_SECRET && process.env.JWT_REFRESH_SECRET);
    res.writeHead(ok ? 200 : 503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ok,
      jwtSecret: fingerprint(process.env.JWT_SECRET),
      jwtRefreshSecret: fingerprint(process.env.JWT_REFRESH_SECRET),
      startedAt,
    }));
    return;
  }
  res.writeHead(404).end();
}).listen(process.env.PORT || 3000, () => console.log('listening'));

const startedAt = new Date().toISOString();
