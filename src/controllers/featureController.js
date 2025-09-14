import { prisma } from "../prismaClient.js";

export const getFeatures = async (req, res) => {
  try {
    const features = await prisma.feature.findMany({ orderBy: { createdAt: "desc" } });
    res.json(features);
  } catch (error) {
    console.error("Erreur getFeatures:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createFeature = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: "Champs manquants" });

    const feature = await prisma.feature.create({ data: { title, description } });
    res.status(201).json(feature);
  } catch (error) {
    console.error("Erreur createFeature:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
