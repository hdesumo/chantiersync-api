import { Router } from "express";
import { TenantRequestController } from "../controllers/TenantRequestController.js";

const router = Router();

// 📌 Créer une demande
router.post("/", TenantRequestController.create);

// 📌 Lister toutes les demandes (utile pour un backoffice)
router.get("/", TenantRequestController.getAll);

export default router;
