'use client';

import { useRef, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateContentFromAudio, type GeneratedContent } from '@/app/actions';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AudioUploadFormProps {
  onContentGenerated: (content: GeneratedContent | null) => void;
  onLoadingChange: (loading: boolean) => void;
  onError: (error: string | null) => void;
  isLoading: boolean;
}

export default function AudioUploadForm({
  onContentGenerated,
  onLoadingChange,
  onError,
  isLoading,
}: AudioUploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoadingChange(true);
    onError(null);
    onContentGenerated(null);

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select an audio file to upload.',
        variant: 'destructive',
      });
      onLoadingChange(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        const audioDataUri = reader.result as string;
        const result = await generateContentFromAudio(audioDataUri);
        onContentGenerated(result);
        toast({
          title: 'Content Generated!',
          description: 'Your LinkedIn post is ready for review.',
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        onError(errorMessage);
      } finally {
        onLoadingChange(false);
      }
    };

    reader.onerror = () => {
      const errorMessage = 'Failed to read the audio file.';
      onError(errorMessage);
      onLoadingChange(false);
    };
  };

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">1. Upload Audio</CardTitle>
        <CardDescription>Select an audio file (e.g., .mp3, .wav, .m4a) to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="file"
            ref={fileInputRef}
            accept="audio/*"
            className="file:text-primary file:font-semibold"
            disabled={isLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating... This may take a moment.
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Generate Post
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
