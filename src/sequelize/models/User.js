import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: DataTypes.STRING,
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'OWNER' },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ACTIVE' }
  }, { tableName: 'users', underscored: true });
  return User;
};
