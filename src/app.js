import express from 'express';
import routes from './routes/index.js';

const app = express();

// ✅ Middleware globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Healthcheck direct
app.get('/healthz', (_req, res) => {
  res.json({ ok: true, service: 'api', ts: new Date().toISOString() });
});

// ✅ Ping direct
app.get('/ping', (_req, res) => {
  res.json({ pong: true, ts: new Date().toISOString() });
});

// ✅ Routes principales montées sous /api
app.use('/api', routes);

// ✅ Middleware d'erreurs tout en bas
app.use((err, _req, res, _next) => {
  console.error('🧨 Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
