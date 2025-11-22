'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import AudioUploadForm from '@/components/audio-upload-form';
import PostPreview from '@/components/post-preview';
import type { GeneratedContent } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function Home() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContentGenerated = (content: GeneratedContent | null) => {
    setGeneratedContent(content);
    if (content) {
      setError(null);
    }
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleError = (errorMessage: string | null) => {
    setError(errorMessage);
    if (errorMessage) {
      setGeneratedContent(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto grid gap-12">
          <section className="text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              Transform Audio into LinkedIn Posts
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your session audio, and let AI craft the perfect LinkedIn post for you. Effortless content creation starts here.
            </p>
          </section>

          <AudioUploadForm
            onContentGenerated={handleContentGenerated}
            onLoadingChange={handleLoadingChange}
            onError={handleError}
            isLoading={isLoading}
          />

          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>An Error Occurred</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {generatedContent && !isLoading && <PostPreview content={generatedContent} />}
        </div>
      </main>
      <footer className="py-6 text-center text-muted-foreground text-sm">
        <p>Powered by LinkScribe</p>
      </footer>
    </div>
  );
}
