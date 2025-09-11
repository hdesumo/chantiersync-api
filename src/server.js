import app from './app.js';
import sequelize from './sequelize/config.js';

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    // ✅ Test de connexion DB
    await sequelize.authenticate();
    console.log('✅ DB connected successfully');

    // 🚀 Lancer l'API seulement si la DB est OK
    app.listen(PORT, () => {
      console.log(`🚀 API listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1); // Empêche de démarrer si pas de DB
  }
})();
