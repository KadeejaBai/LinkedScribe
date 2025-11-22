
'use server';

import { transcribeAudioToText } from '@/ai/flows/transcribe-audio-to-text';
import { summarizeAudioContent } from '@/ai/flows/summarize-audio-content';
import { generateLinkedInPostFromTranscription } from '@/ai/flows/generate-linkedin-post-from-transcription';
import { suggestRelevantHashtags } from '@/ai/flows/suggest-relevant-hashtags';

export interface GeneratedContent {
  transcription: string;
  summary: string;
  post: string;
  hashtags: string[];
}

export async function generateContentFromAudio(audioDataUri: string): Promise<GeneratedContent> {
  try {
    if (!audioDataUri) {
      throw new Error('Audio data is missing.');
    }
    
    // 1. Transcribe audio to text
    const { transcription } = await transcribeAudioToText({ audioDataUri });

    if (!transcription) {
      throw new Error('Transcription failed or returned empty text. The audio might be silent or in an unsupported format.');
    }

    // 2. Generate content in parallel from transcription
    const [summaryResult, postResult, hashtagsResult] = await Promise.all([
      summarizeAudioContent({ transcription }),
      generateLinkedInPostFromTranscription({ transcription }),
      suggestRelevantHashtags({ transcribedText: transcription }),
    ]);

    return {
      transcription,
      summary: summaryResult.summary,
      post: postResult.linkedInPost,
      hashtags: hashtagsResult.hashtags,
    };
  } catch (error) {
    console.error('Error generating content from audio:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate content: ${error.message}`);
    }
    throw new Error('An unknown error occurred during content generation.');
  }
}
