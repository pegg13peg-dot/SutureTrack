import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY is missing from environment variables.");
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const askWoundCareAdvisor = async (question: string): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    return "Please configure your API Key to use the AI Assistant.";
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: "You are a helpful medical assistant specializing in wound care and suture management. Provide concise, safe, and professional advice. Always include a disclaimer that you are an AI and they should consult a doctor for serious concerns. Keep answers under 150 words.",
      }
    });
    
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the service right now.";
  }
};