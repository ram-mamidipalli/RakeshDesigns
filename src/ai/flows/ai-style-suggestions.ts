'use server';

/**
 * @fileOverview An AI agent that suggests graphic design styles based on user input.
 *
 * - generateStyleSuggestions - A function that generates style suggestions.
 * - AIStyleSuggestionsInput - The input type for the generateStyleSuggestions function.
 * - AIStyleSuggestionsOutput - The return type for the generateStyleSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIStyleSuggestionsInputSchema = z.object({
  imageExamples: z
    .string()
    .describe(
      "Example images as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
    .optional(),
  styleDescription: z
    .string()
    .describe('A description of the desired style.')
    .optional(),
});
export type AIStyleSuggestionsInput = z.infer<typeof AIStyleSuggestionsInputSchema>;

const AIStyleSuggestionsOutputSchema = z.object({
  moodboardImage: z
    .string()
    .describe("AI-generated moodboard image as a data URI."),
  styleDescription: z
    .string()
    .describe('A description of the suggested style.'),
});
export type AIStyleSuggestionsOutput = z.infer<typeof AIStyleSuggestionsOutputSchema>;

export async function generateStyleSuggestions(
  input: AIStyleSuggestionsInput
): Promise<AIStyleSuggestionsOutput> {
  return aiStyleSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiStyleSuggestionsPrompt',
  input: {schema: AIStyleSuggestionsInputSchema},
  output: {schema: AIStyleSuggestionsOutputSchema},
  prompt: `You are an expert graphic designer who specializes in understanding the needs of the client and creating moodboards that match their artistic and design direction. 

Based on the client's input, create a moodboard image. The image should contain elements to reflect the description and uploaded images.

Description: {{{styleDescription}}}
Images: {{#if imageExamples}} {{media url=imageExamples}}{{else}} None {{/if}}

Also provide a written description of the style of the moodboard. Be as descriptive as possible.`,
});

const aiStyleSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiStyleSuggestionsFlow',
    inputSchema: AIStyleSuggestionsInputSchema,
    outputSchema: AIStyleSuggestionsOutputSchema,
  },
  async input => {
    const {
      imageExamples,
      styleDescription,
    } = input;

    let promptText = '';

    if (imageExamples) {
      promptText += `Here are the images provided: ${imageExamples}\n`;
    }

    if (styleDescription) {
      promptText += `Here is the description of the style: ${styleDescription}\n`;
    }

    const {output} = await prompt({
      imageExamples: imageExamples,
      styleDescription: styleDescription,
    });

    return output!;
  }
);
