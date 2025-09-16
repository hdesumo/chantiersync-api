// src/routes/tenantRequestRoutes.js
import { Router } from "express";
import { TenantRequestController } from "../controllers/TenantRequestController.js";

const router = Router();

// ✅ Créer une nouvelle demande d’essai
router.post("/", TenantRequestController.create);

// ✅ Récupérer toutes les demandes
router.get("/", TenantRequestController.getAll);

export default router;
