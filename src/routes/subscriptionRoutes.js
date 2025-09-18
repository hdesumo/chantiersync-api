import express from "express";
import {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
} from "../controllers/SubscriptionController.js";

const router = express.Router();

// POST /api/subscriptions → créer un abonnement
router.post("/", createSubscription);

// GET /api/subscriptions → liste des abonnements
router.get("/", getSubscriptions);

// GET /api/subscriptions/:id → abonnement par ID
router.get("/:id", getSubscriptionById);

export default router;
