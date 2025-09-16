import express from "express";
import cors from "cors";
import morgan from "morgan";
import prisma from "./prismaClient.js";

// Routes
import router from "./routes/index.js";
import tenantRequestRoutes from "./routes/tenantRequestRoutes.js";
import trialRoutes from "./routes/trialRoutes.js"; // ✅ Correction ici

const app = express();

/* ===========================
   🔧 Middlewares globaux
=========================== */
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // logs HTTP

/* ===========================
   📌 Routes
=========================== */
app.use("/", router);
app.use("/api/tenant-requests", tenantRequestRoutes);
app.use("/api/trials", trialRoutes); // ✅ Route correctement branchée

/* ===========================
   ❌ Gestion 404
=========================== */
app.use((req, res, next) => {
  res.status(404).json({ error: "Route non trouvée" });
});

/* ===========================
   ❌ Gestion erreurs globales
=========================== */
app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur:", err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

/* ===========================
   🚀 Démarrage serveur
=========================== */
const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ DB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 API listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erreur connexion DB:", err);
    process.exit(1);
  }
}

startServer();
