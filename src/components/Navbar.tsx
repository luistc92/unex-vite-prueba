import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/clerk-react';

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
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
} 


