import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ProjectMember = sequelize.define('ProjectMember', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    project_id: { type: DataTypes.UUID, allowNull: false },
    user_id: { type: DataTypes.UUID, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'project_members', underscored: true });
  return ProjectMember;
};
