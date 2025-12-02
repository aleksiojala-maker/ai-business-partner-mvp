import { GoogleGenAI } from "@google/genai";
import { CompanyGenome } from "../types";

export const generateResponse = async (
  apiKey: string,
  promptText: string,
  genome: CompanyGenome,
  systemInstruction?: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please add it in Settings.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Construct the "Contextual Intelligence" system prompt
  const contextPrompt = `
    You are an AI Business Partner for a Finnish micro-enterprise.
    
    COMPANY CONTEXT (The "Company Genome"):
    - Name: ${genome.name || "Unspecified"}
    - Business ID (Y-tunnus): ${genome.y_tunnus || "Unspecified"}
    - Industry: ${genome.industry || "General"}
    - Preferred Tone: ${genome.tone}
    - Language Preference: ${genome.language}

    ${systemInstruction ? `SPECIALIZED ROLE INSTRUCTION: ${systemInstruction}` : ''}

    GENERAL RULES:
    1. If the language is Finnish, use professional "virkakieli" where appropriate, but keep it clear.
    2. Respect Finnish privacy and business laws (GDPR, Finnish Contract Law).
    3. If giving tax info, explicitly state these are estimations and refer to Vero.fi.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        systemInstruction: contextPrompt,
        temperature: 0.7, // Balance creativity and precision
      }
    });

    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to contact Gemini API.");
  }
};