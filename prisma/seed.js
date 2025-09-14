import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Démarrage du seeding...");

  // 1️⃣ Nettoyer les tables (optionnel en dev)
  await prisma.testimonial.deleteMany();
  await prisma.feature.deleteMany();

  // 2️⃣ Insérer quelques features
  await prisma.feature.createMany({
    data: [
      {
        title: "Rapports en temps réel",
        description: "Suivez vos chantiers en direct et recevez des rapports automatiques sur tous vos appareils.",
      },
      {
        title: "Collaboration simplifiée",
        description: "Toute l'équipe reste alignée grâce à des mises à jour instantanées et centralisées.",
      },
      {
        title: "Tableau de bord intelligent",
        description: "Visualisez l'avancement de vos projets en un coup d'œil et anticipez les retards.",
      },
    ],
  });

  // 3️⃣ Insérer quelques témoignages
  await prisma.testimonial.createMany({
    data: [
      {
        author: "Pierre Atépa Goudiaby",
        role: "Architecte et Président du Club des Investisseurs Sénégalais",
        quote: "ChantierSync m'a permis de suivre mes projets en temps réel, même en déplacement à l'étranger.",
      },
      {
        author: "Fatou Diop",
        role: "Directrice de projets BTP",
        quote: "Une plateforme intuitive qui a réduit nos coûts et accéléré nos livraisons.",
      },
      {
        author: "Moussa Traoré",
        role: "Chef de chantier",
        quote: "Mes rapports sont directement consultés au bureau sans attendre. Gain de temps énorme !",
      },
    ],
  });

  console.log("✅ Seeding terminé avec succès !");
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
