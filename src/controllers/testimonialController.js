import prisma from "../prismaClient.js";

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
    res.json(testimonials);
  } catch (error) {
    console.error("Erreur getTestimonials:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { author, role, quote } = req.body;
    if (!author || !quote) return res.status(400).json({ error: "Champs manquants" });

    const testimonial = await prisma.testimonial.create({ data: { author, role, quote } });
    res.status(201).json(testimonial);
  } catch (error) {
    console.error("Erreur createTestimonial:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
