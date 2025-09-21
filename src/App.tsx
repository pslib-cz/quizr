import { HashRouter, Routes, Route } from 'react-router-dom';
import WelcomeView from './components/WelcomeView';
import LocationView from './components/LocationView';
import SummaryView from './components/SummaryView';
import QRScannerView from './components/QRScannerView';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app">
        <header className="app-header">
          <h1>Noc vědců &ndash; cesta bohatství</h1>
          <p className='logo'>&nbsp;</p>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<WelcomeView />} />
            <Route path="/location/:code" element={<LocationView />} />
            <Route path="/code/:code" element={<LocationView />} />
            <Route path="/summary" element={<SummaryView />} />
            <Route path="/scan" element={<QRScannerView />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
