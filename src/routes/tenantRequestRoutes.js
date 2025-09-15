import { Router } from "express";
import { createTenantRequest } from "../controllers/TenantRequestController.js";

const router = Router();

router.post("/", createTenantRequest);

export default router;
