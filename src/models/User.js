import { DataTypes } from 'sequelize';
import sequelize from '../sequelize/config.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    resetToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'Users',
    timestamps: true,
  }
);

// ✅ Vérification au démarrage
console.log('🔍 [DEBUG] Modèle User chargé avec succès.');

export default User;
