import { Router } from 'express';
const router = Router();

router.post('/login', async (req, res) => {
  console.log('🔑 [LOGIN] body =', req.body);
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }
    // 🧪 Réponse de test (remets ta vraie logique ensuite)
    return res.status(200).json({
      token: 'fake-jwt-token',
      user: { id: 1, email }
    });
  } catch (err) {
    console.error('❌ [LOGIN] error:', err);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

export default router;
