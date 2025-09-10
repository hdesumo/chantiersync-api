import { Router } from 'express';

const router = Router();

// ✅ Route de login avec logs + try/catch
router.post('/login', async (req, res) => {
  console.log('🔑 [LOGIN] Incoming request body:', req.body);

  try {
    const { email, password } = req.body;

    // Vérification simple de la présence des champs
    if (!email || !password) {
      console.warn('⚠️ [LOGIN] Missing email or password');
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    // 🔧 Ici tu mettras la vraie logique d'authentification (DB + bcrypt)
    // Exemple minimal pour tester le flux :
    return res.status(200).json({
      token: 'fake-jwt-token',
      user: { id: 1, email }
    });

  } catch (err) {
    console.error('❌ [LOGIN] Internal error:', err);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// ✅ Route de test rapide (ping)
router.get('/ping', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

export default router;
