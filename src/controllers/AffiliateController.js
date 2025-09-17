// src/controllers/AffiliateController.js
import prisma from "../prismaClient.js";

// POST /api/affiliates
export const createAffiliate = async (req, res) => {
  try {
    const { name, email, company, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Nom et email sont obligatoires" });
    }

    const affiliate = await prisma.affiliate.create({
      data: {
        name,
        email,
        company: company || null,
        phone: phone || null,
      },
    });

    return res.status(201).json(affiliate);
  } catch (error) {
    console.error("Erreur createAffiliate:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET /api/affiliates
export const getAffiliates = async (req, res) => {
  try {
    const affiliates = await prisma.affiliate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(affiliates);
  } catch (error) {
    console.error("Erreur getAffiliates:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
