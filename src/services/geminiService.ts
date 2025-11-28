import { GoogleGenAI } from "@google/genai";

// Function to generate the system prompt dynamically based on current data
const generateSystemInstruction = (contextData: string) => `
You are an expert sales consultant for GCN (Global City Net), an internet service provider.
Your goal is to help users select the best internet plan based on their needs.

Current Plans and Data:
${contextData}

Rules:
- Be concise and friendly.
- Recommend the best value plan based on the user's description.
- Always mention bonuses if applicable.
- Respond in Ukrainian language primarily.
- Keep responses under 50 words unless explaining technical details.
`;

export const getAiPlanRecommendation = async (userMessage: string, contextData?: string): Promise<string> => {
  // Guideline: The API key must be obtained exclusively from the environment variable import.meta.env.VITE_API_KEY.
  // Guideline: Assume this variable is pre-configured, valid, and accessible.
  
  try {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    
    // Fallback static data if context is missing (safe default)
    const staticContext = `
    Plans:
    1. "Global Comfort": 75 Mbps, 270 UAH/mo.
    2. "Global Classic": 100 Mbps, 350 UAH/mo.
    3. "Global Classic Plus": 500 Mbps, 400 UAH/mo.
    4. "Global Gigabit": 1000 Mbps, 500 UAH/mo.
    `;

    const systemInstruction = generateSystemInstruction(contextData || staticContext);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        // Removed maxOutputTokens to allow the model to manage its token usage, especially if thinking is involved.
      }
    });

    return response.text || "Не вдалося отримати відповідь від AI. Спробуйте ще раз.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Виникла помилка при з'єднанні з AI консультантом.";
  }
};