import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';
import routes from './routes/index.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: [/localhost/, /chantiersync\.com$/], credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use('/healthz', (req, res) => res.json({ ok: true }));
app.use('/api', routes);
app.use(errors());
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
export default app;
