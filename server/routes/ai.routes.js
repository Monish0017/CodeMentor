import express from "express";
import {
  aiChat,
  createChat,
  getChatHistory,
  getChatTitles,
  clearChatHistory,
} from "../controllers/ai.controller.js";

// Handle the AI chat request
const router = express.Router();

// AI response
router.post("/chat", aiChat);

// Create a new chat
router.post("/chat/new", createChat);

//Get chat titles
router.get("/chat/titles", getChatTitles);

router.get("/chat/history", getChatHistory);

//Clear chat history by title
router.delete("/chat/clear", clearChatHistory);

export default router;
