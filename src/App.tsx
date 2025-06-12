import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignedIn } from '@clerk/clerk-react';
import { Navbar } from './components/Navbar';

function App() {
  const tasks = useQuery(api.tasks.get);
  return (
    <>
      <Navbar />
      <main>
        <SignedIn>
          <div className= "">
            {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
          </div>
        </SignedIn>
      </main>
    </>
  );
}

export default App;

