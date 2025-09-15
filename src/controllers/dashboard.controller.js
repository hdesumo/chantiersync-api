import prisma from "../prismaClient.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [users, chantiers, rapports] = await Promise.all([
      prisma.user.count(),
      prisma.chantier.count(),
      prisma.rapport.count(),
    ]);

    res.json({ totalUsers: users, totalChantiers: chantiers, totalRapports: rapports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des stats" });
  }
};
