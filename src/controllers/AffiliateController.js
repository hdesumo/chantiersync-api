// controllers/AffiliateController.js
import prisma from "../lib/prismaClient.js";  // Assure-toi que ton client Prisma est bien exporté ici

// Créer un partenaire
export const createAffiliate = async (req, res) => {
  try {
    const { name, email, company, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Nom, email et téléphone sont obligatoires." });
    }

    const newAffiliate = await prisma.affiliate.create({
      data: { name, email, company, phone },
    });

    res.status(201).json(newAffiliate);
  } catch (error) {
    console.error("Erreur création partenaire :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer tous les partenaires
export const getAffiliates = async (req, res) => {
  try {
    const affiliates = await prisma.affiliate.findMany({ orderBy: { createdAt: "desc" } });
    res.json(affiliates);
  } catch (error) {
    console.error("Erreur récupération partenaires :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
