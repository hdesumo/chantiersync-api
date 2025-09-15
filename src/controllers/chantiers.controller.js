import prisma from "../prismaClient.js";

export const getChantiers = async (req, res) => {
  try {
    const chantiers = await prisma.chantier.findMany({
      include: { rapports: true, user: true },
    });
    res.json(chantiers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des chantiers" });
  }
};

export const createChantier = async (req, res) => {
  try {
    const { nom, adresse, userId } = req.body;
    const chantier = await prisma.chantier.create({ data: { nom, adresse, userId } });
    res.status(201).json(chantier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du chantier" });
  }
};

export const updateChantier = async (req, res) => {
  try {
    const chantier = await prisma.chantier.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(chantier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du chantier" });
  }
};

export const deleteChantier = async (req, res) => {
  try {
    await prisma.chantier.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Chantier supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression du chantier" });
  }
};
