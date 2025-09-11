import { Router } from 'express';
import authRoutes from './authRoutes.js'; // ✅ corrige le chemin

const router = Router();

// ✅ ping sur /api/ping
router.get('/ping', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// ✅ monte les routes d'auth
router.use('/auth', authRoutes);

export default router;
