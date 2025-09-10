import 'dotenv/config';

export default {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // 🔑 accepte le certificat auto-signé
      },
    },
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // 🔑 accepte le certificat auto-signé
      },
    },
    logging: false,
  }
};
