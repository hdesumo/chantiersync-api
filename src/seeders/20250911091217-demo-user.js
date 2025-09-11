import bcrypt from 'bcryptjs';

export async function up(queryInterface, Sequelize) {
  const hashedPassword = await bcrypt.hash('password123', 10);
  await queryInterface.bulkInsert('Users', [
    {
      email: 'test@example.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', { email: 'test@example.com' });
}
