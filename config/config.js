import 'dotenv/config';

export default {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DATABASE_SSL === 'true'
        ? { require: true, rejectUnauthorized: false }
        : false
    },
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DATABASE_SSL === 'true'
        ? { require: true, rejectUnauthorized: false }
        : false
    },
    logging: false
  }
};
