import crypto from 'crypto';
import bcrypt from 'bcryptjs'; // ✅ utilisation de bcryptjs
import User from '../models/User.js';

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await user.update({ resetToken, resetTokenExpiry });

    console.log(`🔑 [DEBUG] Lien de reset : https://ton-frontend/reset-password?token=${resetToken}`);

    return res.json({ message: 'Lien de réinitialisation généré. Vérifiez les logs.' });
  } catch (err) {
    console.error('❌ Erreur forgotPassword:', err);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user) {
      return res.status(400).json({ message: 'Token invalide.' });
    }

    if (new Date() > user.resetTokenExpiry) {
      return res.status(400).json({ message: 'Token expiré.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return res.json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (err) {
    console.error('❌ Erreur resetPassword:', err);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
