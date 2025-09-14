import express from "express";
import { createReport, getReports, upload } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getReports);
router.post("/", upload.single("photo"), createReport);

export default router;
