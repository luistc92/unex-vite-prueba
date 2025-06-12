import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Add your brand/logo here if needed */}
      </div>
      <div className="navbar-auth">
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