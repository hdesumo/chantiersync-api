import prisma from "../prismaClient.js";

export const TrialController = {
  // 📌 Créer une demande d’essai
  async create(req, res) {
    try {
      const { name, email, company, phone } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Nom et email sont obligatoires" });
      }

      const trial = await prisma.trial.create({
        data: { name, email, company, phone }
      });

      res.status(201).json(trial);
    } catch (err) {
      console.error("❌ Erreur création essai:", err);
      res.status(500).json({ error: "Impossible de créer la demande d’essai" });
    }
  },

  // 📌 Lister toutes les demandes d’essai
  async getAll(req, res) {
    try {
      const trials = await prisma.trial.findMany({
        orderBy: { createdAt: "desc" }
      });
      res.json(trials);
    } catch (err) {
      console.error("❌ Erreur récupération essais:", err);
      res.status(500).json({ error: "Impossible de lister les essais" });
    }
  }
};
