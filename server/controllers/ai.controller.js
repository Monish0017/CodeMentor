import User from "../models/user.model.js";
import AIChats from "../models/aiChats.model.js"; // Import the new model
import {
  getAIResponse,
  getAIResponseWithLocalFile,
} from "../utils/ai-helper.js";

export const createChat = async (req, res) => {
  const { googleId, title } = req.body; // Get 'title' from request body

  try {
    const user = await User.findOne({ googleId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const existingChat = await AIChats.findOne({ userId: user._id, title });
    if (existingChat) {
      return res.status(400).json({ error: "Chat already exists" });
    }

    const newChat = new AIChats({ userId: user._id, title });
    user.aiChats.push(newChat._id);
    await user.save();
    await newChat.save();

    res.status(201).json({ chat: newChat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const aiChat = async (req, res) => {
  try {
    console.log(req.body);
    const {
      message,
      googleId,
      accessToken,
      driveFileId,
      title,
      id,
      localFile,
    } = req.body; // Use 'id' instead of 'title'

    // Check if required fields are provided
    if (!message || !googleId || !accessToken || !id) {
      return res.status(400).json({
        error: "Message, googleId, accessToken, and id are required", // Update error message
      });
    }

    // Find the user
    const user = await User.findOne({ googleId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find or create an AIChats document for the given 'id'
    let aiChat = await AIChats.findById(id);
    if (!aiChat) {
      // If no AIChat found with the provided 'id', create a new one
      aiChat = new AIChats({ userId: user._id, title });
      user.aiChats.push(aiChat._id);
      await user.save();
    }

    // Generate an AI response with the context

    let aiResponse;
    if (localFile) {
      aiResponse = await getAIResponseWithLocalFile(
        message,
        aiChat.chatHistory, // Use chatHistory from AIChats
        localFile
      );
    } else {
      aiResponse = await getAIResponse(
        message,
        aiChat.chatHistory, // Use chatHistory from AIChats
        driveFileId,
        accessToken
      );
    }

    // Remove the "AI: " prefix from the response if it exists
    aiResponse.response = aiResponse.response.replace(/^AI: /, "");

    // Save the new message and response to the AIChats chatHistory
    aiChat.chatHistory.push({
      userMessage: message,
      aiResponse: aiResponse.response,
    });
    await aiChat.save();

    // Send the response
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};

export const getChatTitles = async (req, res) => {
  const { googleId } = req.query; // Get googleId from query parameters

  try {
    const user = await User.findOne({ googleId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const chatIds = user.aiChats;
    const titles = await AIChats.find({ _id: { $in: chatIds } }).select(
      "is title"
    ); // Use 'is' instead of 'title'
    res.status(200).json({ titles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChatHistory = async (req, res) => {
  const { googleId, id } = req.query; // Get 'is' from query parameters instead of 'title'

  try {
    const user = await User.findOne({ googleId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const aiChat = await AIChats.findById(id);
    if (!aiChat)
      return res.status(404).json({ error: "Conversation not found" });

    res.status(200).json({ chatHistory: aiChat.chatHistory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearChatHistory = async (req, res) => {
  const { googleId, is } = req.query; // Get 'is' from query parameters instead of 'title'

  try {
    const user = await User.findOne({ googleId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const aiChat = await AIChats.findOneAndDelete({ userId: user._id, is });
    if (!aiChat)
      return res.status(404).json({ error: "Conversation not found" });

    res.status(200).json({ message: `Chat history for ${is} cleared` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
