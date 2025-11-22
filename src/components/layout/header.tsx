import { Logo } from '@/components/icons';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="font-headline text-xl font-bold">LinkScribe</span>
        </div>
      </div>
    </header>
  );
}
