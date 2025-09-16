import express from "express";
import cors from "cors";
import morgan from "morgan";
import prisma from "./prismaClient.js";
import router from "./routes/index.js";
import tenantRequestRoutes from "./routes/tenantRequestRoutes.js";
import trialRoutes from "./routes/trialRoutes.js";

const app = express();

/* =========================
   🌍 Middlewares CORS
   ========================= */
const allowedOrigins = [
  "https://www.chantiersync.com",
  "https://chantiersync-portal.vercel.app"
];

// En dev → tout est permis
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      // ex: requêtes curl ou Postman
      return callback(null, true);
    }

    if (process.env.NODE_ENV !== "production") {
      // en local ou staging → autoriser tout
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS non autorisé pour cet origin: " + origin));
  },
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
