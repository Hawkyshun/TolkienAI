import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "tunedModels/tolkienai-jlmq133zgx4x",  // Fixed syntax error with extra quote
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
  }
});

let chatSession: any = null;

export const initChat = () => {
  chatSession = model.startChat({
    history: [
      {
        role: "user",
        parts: "You are TolkienAI, an expert on Middle-earth and the works of J.R.R. Tolkien. Always respond in character as a wise and knowledgeable guide to Middle-earth. Keep responses concise but informative."
      }
    ]
  });
  return chatSession;
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) {
    chatSession = initChat();
  }
  
  try {
    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to get response from TolkienAI');
  }
};