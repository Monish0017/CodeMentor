import mongoose from "mongoose";

const aiChatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, unique: true }, // Unique identifier for each conversation
    chatHistory: [
      {
        userMessage: { type: String, required: true },
        aiResponse: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AIChats = mongoose.model("AIChats", aiChatSchema);
export default AIChats;
