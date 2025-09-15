import prisma from "../prismaClient.js";
import multer from "multer";

// 📂 Config upload fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

/**
 * 📌 Créer un rapport
 */
export const createReport = async (req, res) => {
  try {
    const { chantierId, agentId, latitude, longitude, timestamp } = req.body;

    if (!agentId || !timestamp) {
      return res.status(400).json({ error: "agentId et timestamp sont requis" });
    }

    const newReport = await prisma.rapport.create({
      data: {
        chantierId: chantierId ? parseInt(chantierId) : null,
        agentId: agentId ? parseInt(agentId) : null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
        createdAt: timestamp ? new Date(timestamp) : new Date(),
      },
    });

    res.status(201).json(newReport);
  } catch (error) {
    console.error("Erreur createReport:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

/**
 * 📌 Récupérer rapports (filtres + pagination)
 */
export const getReports = async (req, res) => {
  try {
    const { limit, page, from, to, chantierId, agentId } = req.query;

    // Limite par défaut 10
    const take = limit ? parseInt(limit) : 10;
    // Page par défaut 1
    const skip = page ? (parseInt(page) - 1) * take : 0;

    // Filtres dynamiques
    const filters = {};
    if (chantierId) filters.chantierId = parseInt(chantierId);
    if (agentId) filters.agentId = parseInt(agentId);

    if (from || to) {
      filters.createdAt = {};
      if (from) filters.createdAt.gte = new Date(from);
      if (to) filters.createdAt.lte = new Date(to);
    }

    // Requête paginée
    const [reports, total] = await Promise.all([
      prisma.rapport.findMany({
        where: filters,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.rapport.count({ where: filters }),
    ]);

    res.json({
      total,                // nombre total de rapports
      page: page ? parseInt(page) : 1,
      limit: take,
      totalPages: Math.ceil(total / take),
      data: reports,
    });
  } catch (error) {
    console.error("Erreur getReports:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
