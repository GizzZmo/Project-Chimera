
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { UploadedFile } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-preview-04-17';

const fileToPart = (file: UploadedFile) => {
  return {
    inlineData: {
      mimeType: file.type,
      data: file.content.split(',')[1],
    },
  };
};

export const generateContentStream = (
    prompt: string, 
    fileContext?: UploadedFile, 
    isWebQuery?: boolean
): Promise<AsyncGenerator<GenerateContentResponse>> => {
    
    const textPart = { text: prompt };
    const contents = fileContext 
      ? { parts: [textPart, fileToPart(fileContext)] }
      : { parts: [textPart] };

    const config = isWebQuery ? { tools: [{ googleSearch: {} }] } : {};

    return ai.models.generateContentStream({
        model,
        contents,
        config,
    });
};
