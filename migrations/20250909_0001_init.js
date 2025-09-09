'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
      name: Sequelize.STRING,
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      phone: Sequelize.STRING,
      password_hash: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.STRING, allowNull: false, defaultValue: 'OWNER' },
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'ACTIVE' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') }
    });
    await queryInterface.createTable('projects', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
      owner_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING, allowNull: false },
      country: Sequelize.STRING,
      city: Sequelize.STRING,
      address: Sequelize.STRING,
      start_date: Sequelize.DATEONLY,
      end_date_plan: Sequelize.DATEONLY,
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') }
    });
    await queryInterface.createTable('project_members', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
      project_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'projects', key: 'id' }, onDelete: 'CASCADE' },
      user_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      role: { type: Sequelize.STRING, allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') }
    });
    await queryInterface.addConstraint('project_members', {
      fields: ['project_id', 'user_id'],
      type: 'unique',
      name: 'uniq_project_user'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('project_members');
    await queryInterface.dropTable('projects');
    await queryInterface.dropTable('users');
  }
}
