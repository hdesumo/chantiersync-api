import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import {
  getChantiers,
  createChantier,
  updateChantier,
  deleteChantier,
} from "../controllers/chantiers.controller.js";
import { getRapports, createRapport } from "../controllers/rapports.controller.js";

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);

// Dashboard
router.get("/dashboard-stats", getDashboardStats);

// Chantiers
router.get("/chantiers", getChantiers);
router.post("/chantiers", createChantier);
router.put("/chantiers/:id", updateChantier);
router.delete("/chantiers/:id", deleteChantier);

// Rapports
router.get("/rapports", getRapports);
router.post("/rapports", createRapport);

export default router;
