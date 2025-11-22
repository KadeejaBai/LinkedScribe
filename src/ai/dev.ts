import { config } from 'dotenv';
config();

import '@/ai/flows/transcribe-audio-to-text.ts';
import '@/ai/flows/generate-linkedin-post-from-transcription.ts';
import '@/ai/flows/suggest-relevant-hashtags.ts';
import '@/ai/flows/summarize-audio-content.ts';