'use client';

import { useState, useEffect } from 'react';
import { type GeneratedContent } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { LinkedInIcon } from '@/components/icons';
import { Calendar as CalendarIcon, Clipboard, Share2, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface PostPreviewProps {
  content: GeneratedContent;
}

export default function PostPreview({ content }: PostPreviewProps) {
  const [post, setPost] = useState(content.post);
  const [hashtags, setHashtags] = useState(content.hashtags.join(' '));
  const [date, setDate] = useState<Date | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    setDate(new Date());
  }, []);
  
  const avatarImage = PlaceHolderImages.find(img => img.id === 'avatar-1');

  const handleCopy = () => {
    const fullPost = `${post}\n\n${hashtags}`;
    navigator.clipboard.writeText(fullPost);
    toast({
      title: 'Copied to clipboard!',
      description: 'You can now paste the content on LinkedIn.',
    });
  };

  const handleShare = () => {
    const linkedInUrl = `https://www.linkedin.com/feed/`;
    window.open(linkedInUrl, '_blank');
    toast({
      title: 'Opening LinkedIn',
      description: 'Paste your copied post to share.',
    });
  };
  
  const handleSchedule = () => {
    toast({
        title: "Post Scheduled!",
        description: `Your post is scheduled for ${format(date!, 'PPP')}. (This is a demo feature)`,
    });
  }

  return (
    <section className="space-y-8 animate-in fade-in-50 duration-500">
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">2. Review & Refine</CardTitle>
          <CardDescription>
            Here's what our AI generated. Review the summary, edit the post, and then share it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">Key Points</TabsTrigger>
              <TabsTrigger value="transcription">Full Transcription</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="mt-4 p-4 border rounded-md bg-muted/50 max-h-60 overflow-y-auto">
              <ul className="list-disc pl-5 space-y-2 text-sm text-foreground">
                {content.summary.split('\n').filter(line => line.trim().length > 0 && line.trim() !== 'Summary:').map((line, index) => (
                    <li key={index}>{line.replace(/^[*-]\s*/, '')}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="transcription" className="mt-4 p-4 border rounded-md bg-muted/50 max-h-60 overflow-y-auto">
              <p className="text-sm text-foreground whitespace-pre-wrap">{content.transcription}</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-2xl">LinkedIn Post Composer</CardTitle>
            <LinkedInIcon className="h-8 w-8 text-[#0077B5]" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border rounded-lg bg-card">
              <div className="flex items-center space-x-3">
                  <Avatar>
                      <AvatarImage src={avatarImage?.imageUrl} data-ai-hint={avatarImage?.imageHint} />
                      <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                      <p className="font-semibold text-sm">Your Name</p>
                      <p className="text-xs text-muted-foreground">Social media expert | Content creator</p>
                  </div>
              </div>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="post-content">Post Content</Label>
                  <Textarea
                    id="post-content"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    className="min-h-[180px] text-sm"
                    placeholder="Write your amazing post here..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hashtags">Hashtags</Label>
                  <Input
                    id="hashtags"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    placeholder="#linkedin #contentcreation #ai"
                  />
                </div>
              </div>
          </div>
          
          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button onClick={handleCopy}><Clipboard className="mr-2" />Copy Post</Button>
            <Button onClick={handleShare}><Share2 className="mr-2" />Share on LinkedIn</Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full"><CalendarIcon className="mr-2" />Schedule Post</Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                <div className="p-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input type="time" defaultValue="09:00" />
                    </div>
                    <Button onClick={handleSchedule} className="w-full mt-4">Confirm Schedule</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
