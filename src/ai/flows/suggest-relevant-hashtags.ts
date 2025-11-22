'use server';

/**
 * @fileOverview This file contains a Genkit flow that suggests relevant hashtags for a LinkedIn post based on transcribed audio content.
 *
 * - suggestRelevantHashtags -  A function that takes transcribed text as input and returns a list of relevant hashtags.
 * - SuggestRelevantHashtagsInput - The input type for the suggestRelevantHashtags function.
 * - SuggestRelevantHashtagsOutput - The return type for the suggestRelevantHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantHashtagsInputSchema = z.object({
  transcribedText: z
    .string()
    .describe('The transcribed text from the audio recording.'),
});
export type SuggestRelevantHashtagsInput = z.infer<typeof SuggestRelevantHashtagsInputSchema>;

const SuggestRelevantHashtagsOutputSchema = z.object({
  hashtags: z
    .array(z.string())
    .describe('An array of relevant hashtags for the LinkedIn post.'),
});
export type SuggestRelevantHashtagsOutput = z.infer<typeof SuggestRelevantHashtagsOutputSchema>;

export async function suggestRelevantHashtags(
  input: SuggestRelevantHashtagsInput
): Promise<SuggestRelevantHashtagsOutput> {
  return suggestRelevantHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantHashtagsPrompt',
  input: {schema: SuggestRelevantHashtagsInputSchema},
  output: {schema: SuggestRelevantHashtagsOutputSchema},
  prompt: `You are an expert in social media marketing, specializing in LinkedIn.
  Given the following text from a transcribed audio recording, suggest 5-10 relevant hashtags to increase the visibility of a LinkedIn post about this content.
  Return the hashtags as a JSON array of strings.

  Text: {{{transcribedText}}}`,
});

const suggestRelevantHashtagsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantHashtagsFlow',
    inputSchema: SuggestRelevantHashtagsInputSchema,
    outputSchema: SuggestRelevantHashtagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
