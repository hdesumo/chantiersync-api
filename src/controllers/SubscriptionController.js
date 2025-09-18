import prisma from "../prismaClient.js";

// Créer une nouvelle demande d'abonnement
export const createSubscription = async (req, res) => {
  try {
    const { name, email, plan, company, phone } = req.body;

    if (!name || !email || !plan) {
      return res.status(400).json({ error: "Nom, email et plan sont requis" });
    }

    const subscription = await prisma.subscription.create({
      data: {
        name,
        email,
        plan,
        company,
        phone,
      },
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error("Erreur création abonnement:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer toutes les demandes d'abonnement
export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(subscriptions);
  } catch (error) {
    console.error("Erreur récupération abonnements:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer une demande par ID
export const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },
    });

    if (!subscription) {
      return res.status(404).json({ error: "Abonnement non trouvé" });
    }

    res.json(subscription);
  } catch (error) {
    console.error("Erreur récupération abonnement:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
