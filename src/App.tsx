import { SignedIn } from '@clerk/clerk-react';
import { Navbar } from './components/Navbar';
import TruckFreightTable from "./components/TruckFreightTable";


function App() {
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

