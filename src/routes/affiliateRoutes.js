import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// POST : Nouvelle demande d’affiliation
router.post("/", async (req, res) => {
  try {
    const { name, email, company, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Nom et email sont obligatoires" });
    }

    const affiliate = await prisma.affiliate.create({
      data: { name, email, company, phone },
    });

    res.status(201).json(affiliate);
  } catch (err) {
    console.error("Erreur création affiliation:", err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// GET : Liste des affiliés (utile pour SuperAdmin)
router.get("/", async (req, res) => {
  try {
    const affiliates = await prisma.affiliate.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(affiliates);
  } catch (err) {
    console.error("Erreur récupération affiliations:", err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

export default router;
