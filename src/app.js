import express from 'express';
import routes from './routes/index.js';

const app = express();

// ✅ Parse le JSON AVANT de monter les routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Healthcheck direct (utile pour Railway)
app.get('/healthz', (_req, res) => {
  res.json({ ok: true, service: 'api', ts: new Date().toISOString() });
});

// ⚠️ doit rester tout en bas
app.use((err, _req, res, _next) => {
  console.error('🧨 Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.use('/api', routes);

export default app;
