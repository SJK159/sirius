require('dotenv').config({ quiet: true });

const express = require('express');

const authRoutes = require('./routes/auth');
const { runMigrations } = require('./db/migrate');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);

app.use((err, _req, res, _next) => {
  const message = err && err.message ? err.message : 'Internal server error';
  res.status(500).json({ error: message });
});

async function startServer() {
  await runMigrations();

  app.listen(port, () => {
    console.log(`StablePay server running on http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Failed to start', err);
  process.exit(1);
});
