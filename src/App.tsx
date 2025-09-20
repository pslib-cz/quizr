import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LocationView from './components/LocationView';
import SummaryView from './components/SummaryView';
import QRScannerView from './components/QRScannerView';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app">
        <header className="app-header">
          <h1>Quizr - Orientační závod</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/location/A001" replace />} />
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
