import express from "express";
import {
  getAllContactMessages,
  deleteContactMessage,
} from "../controllers/adminMessageController.js";

const router = express.Router();

router.get("/", getAllContactMessages);
router.delete("/:id", deleteContactMessage);

export default router;
