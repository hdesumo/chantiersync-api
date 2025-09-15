import express from "express";

// 🟢 Controllers (assure-toi que les fichiers existent avec ces noms)
import { register, login } from "../controllers/auth.controller.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import {
  getChantiers,
  createChantier,
  updateChantier,
  deleteChantier,
} from "../controllers/chantiers.controller.js";
import { upload, createReport, getReports } from "../controllers/reportcontroller.js";
import {
  getAllContactMessages,
  deleteContactMessage,
} from "../controllers/adminmessagecontroller.js";
import { createContactMessage } from "../controllers/contactcontroller.js";
import { getFeatures, createFeature } from "../controllers/featurecontroller.js";
import { getTestimonials, createTestimonial } from "../controllers/testimonialcontroller.js";

const router = express.Router();

// 🔑 Auth
router.post("/register", register);
router.post("/login", login);

// 📊 Dashboard
router.get("/dashboard-stats", getDashboardStats);

// 🏗️ Chantiers CRUD
router.get("/chantiers", getChantiers);
router.post("/chantiers", createChantier);
router.put("/chantiers/:id", updateChantier);
router.delete("/chantiers/:id", deleteChantier);

// 📝 Rapports liés à chantiers
router.get("/rapports", getRapports);
router.post("/rapports", createRapport);

// 📷 Reports (avec upload image)
router.post("/reports", upload.single("image"), createReport);
router.get("/reports", getReports);

// 📩 Contact + messages admin
router.post("/contact", createContactMessage);
router.get("/admin/messages", getAllContactMessages);
router.delete("/admin/messages/:id", deleteContactMessage);

// ⭐ Features
router.get("/features", getFeatures);
router.post("/features", createFeature);

// 🗨️ Testimonials
router.get("/testimonials", getTestimonials);
router.post("/testimonials", createTestimonial);

export default router;
