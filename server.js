const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const internalKey = process.env.INTERNAL_ACCESS_KEY || 'change-me-internal-key';

function requireInternalAccess(req, res, next) {
  const providedKey = req.header('x-internal-key') || req.query.key;

  if (providedKey !== internalKey) {
    return res.status(403).send('Forbidden: internal area only.');
  }

  return next();
}

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/review-submission', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'review-submission.html'));
});

app.get('/submission-success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'submission-success.html'));
});

app.get('/internal/admin', requireInternalAccess, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'internal', 'admin.html'));
});

app.get('/internal/ops', requireInternalAccess, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'internal', 'ops.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
