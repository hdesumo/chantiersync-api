import app from "./app.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    // Vérifie la connexion PostgreSQL avant de lancer le serveur
    await prisma.$connect();
    console.log("✅ Connecté à PostgreSQL avec succès");

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Impossible de se connecter à la base de données:", error);
    process.exit(1);
  }
}

startServer();

// Pour éviter les fuites de connexion lors de l'arrêt
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
