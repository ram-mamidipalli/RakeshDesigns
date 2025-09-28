"use server";

import { z } from "zod";
import { generateStyleSuggestions, type AIStyleSuggestionsInput } from "@/ai/flows/ai-style-suggestions";

const formSchema = z.object({
  styleDescription: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
});


export async function getAIStyleSuggestions(formData: FormData) {
    try {
        const parsedData = formSchema.parse({
            styleDescription: formData.get("styleDescription") || undefined,
            imageFile: formData.get("imageFile") instanceof File ? formData.get("imageFile") : undefined,
        });

        const input: AIStyleSuggestionsInput = {
            styleDescription: parsedData.styleDescription,
        };

        if (parsedData.imageFile && parsedData.imageFile.size > 0) {
            const buffer = Buffer.from(await parsedData.imageFile.arrayBuffer());
            input.imageExamples = `data:${parsedData.imageFile.type};base64,${buffer.toString('base64')}`;
        }
        
        if (!input.styleDescription && !input.imageExamples) {
            throw new Error("Please provide either a style description or an example image.");
        }

        const result = await generateStyleSuggestions(input);
        return { success: true, data: result };

    } catch (error) {
        let message = "An unknown error occurred.";
        if (error instanceof Error) {
            message = error.message;
        } else if (typeof error === 'string') {
            message = error;
        }
        console.error("AI Style Suggestion Error:", message);
        return { success: false, error: message };
    }
}
