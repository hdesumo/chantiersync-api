import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message, captcha } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Champs obligatoires manquants" });
    }

    // Vérification reCAPTCHA côté serveur (si clé définie)
    if (process.env.RECAPTCHA_SECRET_KEY) {
      const captchaRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        { method: "POST" }
      );
      const captchaData = await captchaRes.json();
      if (!captchaData.success) {
        return res.status(400).json({ error: "Échec de la vérification reCAPTCHA" });
      }
    }

    // Enregistre en base
    const newMessage = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    // Envoi d'une notification par email
    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"ChantierSync" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_NOTIFICATION_EMAIL,
        subject: "📩 Nouveau message de contact",
        text: `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      });
    }

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error("Erreur createContactMessage:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
