import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import {
  getAllContactMessages,
  deleteContactMessage,
} from "../controllers/AdminMessageController.js";
import { createContactMessage } from "../controllers/contactcontroller.js";
import { getFeatures, createFeature } from "../controllers/featurecontroller.js";
import {
  getTestimonials,
  createTestimonial,
} from "../controllers/testimonialcontroller.js";
import {
  createReport,
  getReports,
  upload,
} from "../controllers/reportcontroller.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import {
  getChantiers,
  createChantier,
} from "../controllers/chantiers.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// --- Auth routes ---
router.post("/auth/register", register);
router.post("/auth/login", login);

// --- Contact routes ---
router.post("/contact", createContactMessage);

// --- Admin message routes ---
router.get("/admin/messages", getAllContactMessages);
router.delete("/admin/messages/:id", deleteContactMessage);

// --- Feature routes ---
router.get("/features", getFeatures);
router.post("/features", createFeature);

// --- Testimonial routes ---
router.get("/testimonials", getTestimonials);
router.post("/testimonials", createTestimonial);

// --- Report routes ---
router.post("/reports", requireAuth, upload.single("image"), createReport);
router.get("/reports", requireAuth, getReports);

// --- Dashboard stats ---
router.get("/dashboard-stats", getDashboardStats);

// --- Chantiers ---
router.get("/chantiers", getChantiers);
router.post("/chantiers", createChantier);

// --- Health check ---
router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

export default router;
