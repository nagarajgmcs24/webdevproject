import { GoogleGenAI } from "@google/genai";

export const generateReportDescription = async (shortInput: string, ward: string): Promise<string> => {
  try {
    // Correctly initialize GoogleGenAI with the API key from environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: A citizen in ${ward}, Bengaluru is reporting a local issue. 
                 User input: "${shortInput}"
                 Task: Generate a professional, detailed, and formal civic report description for the ward councillor. 
                 Include details like estimated urgency, potential risks to public safety, and a polite request for resolution. 
                 Keep it within 100 words.`,
    });
    // Access the .text property directly as per Gemini API guidelines
    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Formal Report for ${ward}: ${shortInput}. Immediate attention requested to resolve this civic grievance.`;
  }
};