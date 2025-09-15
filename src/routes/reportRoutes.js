const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { requireAuth } = require("../middleware/auth");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// 📂 Upload dir
const uploadDir = path.join(__dirname, "../uploads/reports");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

// 📋 GET /reports
router.get("/", requireAuth, async (req, res) => {
  try {
    const { date, chantierId, agentId, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (chantierId) filters.chantierId = chantierId;
    if (agentId) filters.agentId = agentId;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      filters.createdAt = { gte: start, lt: end };
    }

    const total = await prisma.report.count({ where: filters });

    const items = await prisma.report.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      orderBy: { createdAt: "desc" },
    });

    res.json({ total, items });
  } catch (err) {
    console.error("Erreur GET /reports :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ➕ POST /reports
router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  try {
    const { chantierId, agentId, latitude, longitude } = req.body;

    if (!chantierId || !agentId) {
      return res.status(400).json({ message: "ChantierId et AgentId requis" });
    }

    const imageUrl = req.file ? `/uploads/reports/${req.file.filename}` : null;

    const newReport = await prisma.report.create({
      data: {
        chantierId,
        agentId,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        imageUrl,
      },
    });

    res.status(201).json(newReport);
  } catch (err) {
    console.error("Erreur POST /reports :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
