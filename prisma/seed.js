import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Lancement du seeding...");

  // 1️⃣ Nettoyer les tables (optionnel en dev)
  await prisma.rapport.deleteMany();
  await prisma.chantier.deleteMany();
  await prisma.user.deleteMany();

  // 2️⃣ Créer un admin
  const hashedPassword = await bcrypt.hash("password123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    },
  });
  console.log("👤 Admin créé:", admin.email);

  // 3️⃣ Créer un chantier de test
  const chantier = await prisma.chantier.create({
    data: {
      nom: "Chantier de test",
      adresse: "Dakar Plateau",
      userId: admin.id,
    },
  });
  console.log("🏗️ Chantier créé:", chantier.nom);

  // 4️⃣ Créer deux rapports liés à ce chantier
  const rapports = await prisma.rapport.createMany({
    data: [
      {
        chantierId: chantier.id,
        imageUrl: "https://via.placeholder.com/300.png",
        latitude: 14.6928,
        longitude: -17.4467,
      },
      {
        chantierId: chantier.id,
        imageUrl: "https://via.placeholder.com/300.png",
        latitude: 14.7000,
        longitude: -17.4500,
      },
    ],
  });
  console.log(`📝 ${rapports.count} rapports créés`);

  console.log("✅ Seeding terminé !");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erreur lors du seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
