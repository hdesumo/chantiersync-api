import prisma from "../prismaClient.js";

export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (error) {
    console.error("Erreur getAllContactMessages:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({
      where: { id: parseInt(id) },
    });
    res.json({ success: true, message: "Message supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteContactMessage:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
