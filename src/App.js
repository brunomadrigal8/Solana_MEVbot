import './App.css';
import Layout from './Layout';
import {Routes,Route} from "react-router-dom"
import FrontRunner from './pages/Home/frontrunner';
import Liquidation from './pages/Home/liquidation';
import Longtail from './pages/Home/longtail';
import WholeBlock from './pages/Home/wholeblock';
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import EnvSetupModal from './components/EnvSetupModal';
import { isWalletConfigured } from './utils/envValidator';

function App() {
  const [showEnvSetup, setShowEnvSetup] = useState(false);
  const [walletConfigured, setWalletConfigured] = useState(true);

  useEffect(() => {
    // Check if wallet is configured on app load
    const configured = isWalletConfigured() || localStorage.getItem('TEMP_WALLET_KEY');
    
    if (!configured) {
      setShowEnvSetup(true);
      setWalletConfigured(false);
    } else {
      setWalletConfigured(true);
    }
  }, []);

  const handleEnvSetupComplete = (walletKey) => {
    setShowEnvSetup(false);
    setWalletConfigured(true);
  };

  return (
    <div className="App">
      <EnvSetupModal 
        isOpen={showEnvSetup} 
        onComplete={handleEnvSetupComplete}
      />
      
      {walletConfigured && (
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home/>}>
              <Route exact path='frontrunner' element={< FrontRunner/>}/>
              <Route exact path='longtail' element={<Longtail/>}/>
              <Route exact path='wholeblock' element={<WholeBlock/>}/>
            </Route>
          </Routes>
        </Layout>
      )}
    </div>
  );
}

export default App;
