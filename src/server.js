import 'dotenv/config';
import app from './app.js';
import { sequelize } from './sequelize/index.js';

const port = process.env.PORT || 8080;
(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
  } catch (e) {
    console.error('DB connection failed:', e.message);
  }
  app.listen(port, () => console.log(`API listening on :${port}`));
})();
