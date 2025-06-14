import { SignedIn, UserButton } from '@clerk/clerk-react';

export function Navbar({ title }: { title: string }) {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="font-bold text-lg">
        {title}
      </div>
      <div className="flex items-center gap-1">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
} 


