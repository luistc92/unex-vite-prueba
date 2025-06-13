import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div>
        {/* Add your brand/logo here if needed */}
      </div>
      <div className="flex items-center gap-1">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
} 


