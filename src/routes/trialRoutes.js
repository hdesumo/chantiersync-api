import { Router } from "express";
import { TrialController } from "../controllers/TrialController.js";

const router = Router();

// 📌 Créer une demande d’essai
router.post("/", TrialController.create);

// 📌 Lister toutes les demandes d’essai
router.get("/", TrialController.getAll);

export default router;
