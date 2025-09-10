import { Router } from 'express';
import authRoutes from './auth.js';
// importe d'autres routes si besoin

const router = Router();

// ✅ ping sur /api/ping
router.get('/ping', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

router.use('/auth', authRoutes);

export default router;
