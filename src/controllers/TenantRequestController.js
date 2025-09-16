import prisma from "../prismaClient.js";

export const TenantRequestController = {
  async create(req, res) {
    try {
      const { nom, email, entreprise, telephone } = req.body;

      // ✅ Validation côté backend
      if (!nom || nom.trim().length < 2) {
        return res.status(400).json({ error: "Le nom est requis et doit contenir au moins 2 caractères." });
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email invalide." });
      }
      if (!entreprise || entreprise.trim().length < 2) {
        return res.status(400).json({ error: "Le nom de l'entreprise est requis." });
      }
      if (!telephone || !/^[0-9]{6,15}$/.test(telephone)) {
        return res.status(400).json({ error: "Le téléphone doit contenir uniquement des chiffres (6 à 15)." });
      }

      // Vérifier si l'email existe déjà
      const existing = await prisma.tenantRequest.findUnique({
        where: { email },
      });
      if (existing) {
        return res.status(409).json({ error: "Une demande existe déjà avec cet email." });
      }

      // Créer la demande
      const newRequest = await prisma.tenantRequest.create({
        data: { nom, email, entreprise, telephone },
      });

      return res.status(201).json(newRequest);
    } catch (error) {
      console.error("❌ Erreur création tenant request:", error);
      return res.status(500).json({ error: "Erreur serveur." });
    }
  },

  async getAll(req, res) {
    try {
      const requests = await prisma.tenantRequest.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.json(requests);
    } catch (error) {
      console.error("❌ Erreur récupération tenant requests:", error);
      return res.status(500).json({ error: "Erreur serveur." });
    }
  },
};
