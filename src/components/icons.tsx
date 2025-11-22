import type { SVGProps } from 'react';
import { Share2 } from 'lucide-react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <div className="flex items-center gap-2">
    <div className="p-2 bg-primary text-primary-foreground rounded-lg">
      <Share2 className="h-5 w-5" />
    </div>
  </div>
);

export const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
