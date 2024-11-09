import { GoogleGenerativeAI } from "@google/generative-ai";

// In a production environment, this should be handled through a backend service
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt: string) {
  if (!API_KEY) {
    console.error('Missing API key');
    return "I apologize, but I'm unable to process your request due to missing configuration. Please contact support.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return "I apologize, but I'm having trouble processing your request at the moment. Please try again.";
  }
}