import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Project = sequelize.define('Project', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    owner_id: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date_plan: DataTypes.DATEONLY
  }, { tableName: 'projects', underscored: true });
  return Project;
};
