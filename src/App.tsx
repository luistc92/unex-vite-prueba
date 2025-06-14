import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignedIn } from '@clerk/clerk-react';
import { Navbar } from './components/Navbar';
import TruckFreightTable from "./components/truck-freight-table";


function App() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="h-screen flex flex-col">
      <main>
        <SignedIn>
          <header>
            <Navbar title="Bitácora"/>
          </header>
          <div className="flex-1 min-h-0 overflow-auto m-10 px-4 sm:px-6 lg:px-8">
            <TruckFreightTable/>
          </div>
          
        </SignedIn>
      </main>
    </div>
  );
}

export default App;

