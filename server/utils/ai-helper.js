import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIResponse = async (message, chatHistory = [], accessToken) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const formattedHistory = chatHistory
      .map((entry) => `User: ${entry.userMessage}\nAI: ${entry.aiResponse}`)
      .join("\n");

    const prompt = `${formattedHistory}\nUser: ${message}`;

    const input = [{ text: prompt }];
    const completion = await model.generateContent(input);

    return {
      response: completion.response.text(),
      fullPrompt: prompt,
    };
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};
