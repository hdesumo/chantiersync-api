import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @desc Créer une nouvelle demande d'essai (TenantRequest)
 * @route POST /tenant-requests
 * @access Public
 */
export const createTenantRequest = async (req, res) => {
  try {
    const { nom, email, entreprise, telephone } = req.body;

    // Validation simple
    if (!nom || !email || !entreprise || !telephone) {
      return res
        .status(400)
        .json({ message: "❌ Tous les champs (nom, email, entreprise, téléphone) sont requis." });
    }

    // Vérifier si un email existe déjà
    const existing = await prisma.tenantRequest.findUnique({
      where: { email },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "❌ Une demande existe déjà avec cet email." });
    }

    // Créer une nouvelle demande
    const newRequest = await prisma.tenantRequest.create({
      data: { nom, email, entreprise, telephone },
    });

    return res.status(201).json({
      message: "✅ Votre demande a bien été enregistrée.",
      request: newRequest,
    });
  } catch (error) {
    console.error("Erreur création demande :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

/**
 * @desc Lister toutes les demandes (admin)
 * @route GET /tenant-requests
 * @access Private (Admin)
 */
export const getTenantRequests = async (req, res) => {
  try {
    const requests = await prisma.tenantRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(requests);
  } catch (error) {
    console.error("Erreur récupération demandes :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
