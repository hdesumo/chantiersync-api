import { Sequelize } from 'sequelize';
import 'dotenv/config';
import UserModel from './models/User.js';
import ProjectModel from './models/Project.js';
import ProjectMemberModel from './models/ProjectMember.js';

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: process.env.DATABASE_SSL === 'true' ? { ssl: { require: true } } : {}
});

export const User = UserModel(sequelize);
export const Project = ProjectModel(sequelize);
export const ProjectMember = ProjectMemberModel(sequelize);

Project.belongsTo(User, { as: 'owner', foreignKey: 'owner_id' });
ProjectMember.belongsTo(Project, { foreignKey: 'project_id' });
ProjectMember.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Project, { foreignKey: 'owner_id' });

export default { sequelize, User, Project, ProjectMember };
