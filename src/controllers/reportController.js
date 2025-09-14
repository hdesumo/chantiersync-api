import { prisma } from "../prismaClient.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Crée le dossier uploads/reports si inexistant
const uploadDir = "uploads/reports";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration de multer pour stocker les images localement
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

/**
 * POST /api/reports
 * Crée un rapport avec horodatage et GPS
 */
export const createReport = async (req, res) => {
  try {
    const { agentId, timestamp, latitude, longitude } = req.body;

    if (!agentId || !timestamp) {
      return res.status(400).json({ error: "agentId et timestamp sont requis" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Fichier image requis" });
    }

    const newReport = await prisma.report.create({
      data: {
        agentId: parseInt(agentId),
        timestamp: new Date(timestamp),
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        imageUrl: `/uploads/reports/${req.file.filename}`,
      },
    });

    res.status(201).json({ success: true, data: newReport });
  } catch (error) {
    console.error("Erreur createReport:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

/**
 * GET /api/reports
 * Retourne tous les rapports (pour SuperAdmin ou propriétaire)
 */
export const getReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { timestamp: "desc" },
    });
    res.json(reports);
  } catch (error) {
    console.error("Erreur getReports:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
