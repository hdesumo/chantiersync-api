import express from "express";
import cors from "cors";
import morgan from "morgan";
import contactRoutes from "./routes/contactRoutes.js";
import featureRoutes from "./routes/featureRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import adminMessageRoutes from "./routes/adminMessageRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import router from "./routes/index.js";

const app = express();

// -------------------
// Middlewares globaux
// -------------------
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// -------------------
// Routes principales
// -------------------
app.get("/healthz", (req, res) => res.json({ status: "ok" }));

// Contact form
app.use("/api/contact", contactRoutes);
app.use("/api/features", featureRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin/messages", adminMessageRoutes);
app.use("/api/reports", reportRoutes);

// Ajoute ici les autres routes API si existantes
// ex: app.use("/api/features", featureRoutes);
app.use("/", router);

// -------------------
// Middleware 404
// -------------------
app.use((req, res, next) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// -------------------
// Gestion des erreurs globales
// -------------------
app.use((err, req, res, next) => {
  console.error("Erreur serveur:", err);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

export default app;
