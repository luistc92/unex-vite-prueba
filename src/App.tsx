import "./App.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  const tasks = useQuery(api.tasks.get);
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <div className="App">
          {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
        </div>
      </SignedIn>
    </header>
    
  );
}

export default App;

