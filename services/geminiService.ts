
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not set in the environment.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateMemorialText = async (
  petName: string,
  petType: string,
  traits: string,
  language: Language
): Promise<string> => {
  const ai = getClient();
  if (!ai) return language === 'fi' ? "Aina sydämissämme." : language === 'sv' ? "För alltid i våra hjärtan." : "Forever in our hearts.";

  try {
    const langName = language === 'fi' ? 'Finnish' : language === 'sv' ? 'Swedish' : 'English';
    const prompt = `Write a short, touching, and poetic memorial inscription (max 15 words) for a ${petType} named ${petName}. 
    Traits: ${traits}. 
    The tone should be loving and peaceful. 
    Write the response in ${langName} language.
    Do not include quotes around the output. 
    Return ONLY the text.`;

    // Always use ai.models.generateContent to query GenAI with both the model name and prompt.
    // Use gemini-3-flash-preview for basic text tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // The response.text property (not method) directly returns the generated text content.
    return response.text?.trim() || (language === 'fi' ? "Aina sydämissämme." : language === 'sv' ? "För alltid i våra hjärtan." : "Forever in our hearts.");
  } catch (error) {
    console.error("Error generating text:", error);
    return language === 'fi' ? "Aina sydämissämme." : language === 'sv' ? "För alltid i våra hjärtan." : "Forever in our hearts.";
  }
};
