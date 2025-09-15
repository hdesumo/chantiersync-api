import express from "express";
import { getFeatures, createFeature } from "../controllers/featureController.js";

const router = express.Router();

router.get("/", getFeatures);
router.post("/", createFeature);

export default router;
