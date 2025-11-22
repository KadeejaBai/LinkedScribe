'use server';

/**
 * @fileOverview Generates a LinkedIn post from transcribed text.
 *
 * - generateLinkedInPostFromTranscription - A function that generates a LinkedIn post from transcribed text.
 * - GenerateLinkedInPostFromTranscriptionInput - The input type for the generateLinkedInPostFromTranscription function.
 * - GenerateLinkedInPostFromTranscriptionOutput - The return type for the generateLinkedInPostFromTranscription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkedInPostFromTranscriptionInputSchema = z.object({
  transcription: z
    .string()
    .describe('The transcribed text from the audio recording.'),
});
export type GenerateLinkedInPostFromTranscriptionInput = z.infer<
  typeof GenerateLinkedInPostFromTranscriptionInputSchema
>;

const GenerateLinkedInPostFromTranscriptionOutputSchema = z.object({
  linkedInPost: z
    .string()
    .describe('The generated LinkedIn post content.'),
});

export type GenerateLinkedInPostFromTranscriptionOutput = z.infer<
  typeof GenerateLinkedInPostFromTranscriptionOutputSchema
>;

export async function generateLinkedInPostFromTranscription(
  input: GenerateLinkedInPostFromTranscriptionInput
): Promise<GenerateLinkedInPostFromTranscriptionOutput> {
  return generateLinkedInPostFromTranscriptionFlow(input);
}

const generateLinkedInPostPrompt = ai.definePrompt({
  name: 'generateLinkedInPostPrompt',
  input: {
    schema: GenerateLinkedInPostFromTranscriptionInputSchema,
  },
  output: {
    schema: GenerateLinkedInPostFromTranscriptionOutputSchema,
  },
  prompt: `You are a social media expert specializing in creating engaging LinkedIn posts.

  Based on the transcribed text provided, generate a compelling LinkedIn post that captures the key topics, sentiment, and relevant hashtags.

  Transcription: {{{transcription}}}
  `,
});

const generateLinkedInPostFromTranscriptionFlow = ai.defineFlow(
  {
    name: 'generateLinkedInPostFromTranscriptionFlow',
    inputSchema: GenerateLinkedInPostFromTranscriptionInputSchema,
    outputSchema: GenerateLinkedInPostFromTranscriptionOutputSchema,
  },
  async input => {
    const {output} = await generateLinkedInPostPrompt(input);
    return output!;
  }
);
