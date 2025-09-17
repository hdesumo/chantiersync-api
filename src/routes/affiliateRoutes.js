import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// ➡️ POST /api/affiliates
router.post("/", async (req, res) => {
  console.log("🔍 [DEBUG][POST /api/affiliates] Requête reçue avec body:", req.body);

  try {
    const { name, email, company, phone } = req.body;

    if (!name || !email) {
      console.warn("⚠️ [DEBUG] Champs manquants:", { name, email });
      return res.status(400).json({ error: "Nom et email sont obligatoires." });
    }

    const newAffiliate = await prisma.affiliate.create({
      data: { name, email, company, phone },
    });

    console.log("✅ [DEBUG] Partenaire créé:", newAffiliate);

    res.json(newAffiliate);
  } catch (error) {
    console.error("❌ [DEBUG][POST /api/affiliates] Erreur serveur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ➡️ GET /api/affiliates
router.get("/", async (req, res) => {
  console.log("🔍 [DEBUG][GET /api/affiliates] Récupération de tous les partenaires...");

  try {
    const affiliates = await prisma.affiliate.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log(`✅ [DEBUG] ${affiliates.length} partenaires trouvés`);
    res.json(affiliates);
  } catch (error) {
    console.error("❌ [DEBUG][GET /api/affiliates] Erreur serveur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
