import express from "express";
import cors from "cors";
import morgan from "morgan";
import prisma from "./prismaClient.js";
import router from "./routes/index.js";
import tenantRequestRoutes from "./routes/tenantRequestRoutes.js";
import trialRoutes from "./routes/trialRoutes.js";
import affiliateRoutes from "./routes/affiliateRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

const app = express();

/* =========================
   🌍 CORS (restreint final)
   ========================= */
app.use(cors({
  origin: [
    "https://www.chantiersync.com",          // domaine principal
    "https://chantiersync-portal.vercel.app" // domaine Vercel (staging)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

/* =========================
   📌 Routes
   ========================= */
app.use("/", router);
app.use("/api/tenant-requests", tenantRequestRoutes);
app.use("/api/trials", trialRoutes);
app.use("/api/affiliates", affiliateRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

/* =========================
   ❌ Gestion 404
   ========================= */
app.use((req, res, next) => {
  res.status(404).json({ error: "Route non trouvée" });
});

/* =========================
   ⚠️ Gestion erreurs globales
   ========================= */
app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur:", err.message);
  res.status(500).json({ error: err.message || "Erreur interne du serveur" });
});

/* =========================
   🚀 Démarrage serveur
   ========================= */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ API listening on :${PORT}`);
});
