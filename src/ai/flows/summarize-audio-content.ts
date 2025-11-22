'use server';

/**
 * @fileOverview Summarizes audio content into key bullet points.
 *
 * - summarizeAudioContent - A function that summarizes audio content.
 * - SummarizeAudioContentInput - The input type for the summarizeAudioContent function.
 * - SummarizeAudioContentOutput - The return type for the summarizeAudioContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAudioContentInputSchema = z.object({
  transcription: z
    .string()
    .describe('The transcription text to summarize.'),
});
export type SummarizeAudioContentInput = z.infer<typeof SummarizeAudioContentInputSchema>;

const SummarizeAudioContentOutputSchema = z.object({
  summary: z.string().describe('The summary of the transcription in bullet points.'),
});
export type SummarizeAudioContentOutput = z.infer<typeof SummarizeAudioContentOutputSchema>;

export async function summarizeAudioContent(input: SummarizeAudioContentInput): Promise<SummarizeAudioContentOutput> {
  return summarizeAudioContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAudioContentPrompt',
  input: {schema: SummarizeAudioContentInputSchema},
  output: {schema: SummarizeAudioContentOutputSchema},
  prompt: `You are an expert in summarizing audio transcriptions into key bullet points.

  Summarize the following transcription into a concise list of bullet points that capture the main topics discussed. Focus on providing a clear and informative overview for a professional audience.

Transcription: {{{transcription}}}`,
});

const summarizeAudioContentFlow = ai.defineFlow(
  {
    name: 'summarizeAudioContentFlow',
    inputSchema: SummarizeAudioContentInputSchema,
    outputSchema: SummarizeAudioContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
