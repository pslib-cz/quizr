import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { locations } from '../data';

const WelcomeView = () => {
  const navigate = useNavigate();
  const [manualCode, setManualCode] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleManualCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      const normalizedCode = manualCode.trim().toUpperCase();
      
      // Zkontrolovat, zda kód odpovídá platné lokaci
      const foundLocation = locations.find(loc => loc.key === normalizedCode);
      
      if (foundLocation) {
        navigate(`/location/${normalizedCode}`);
        setManualCode('');
      } else {
        // Zobrazit chybu - kód neexistuje
        setErrorMessage(`Kód "${normalizedCode}" nebyl nalezen. Zadejte platný kód lokace.`);
        setShowErrorModal(true);
      }
    }
  };

  return (
    <div className="location-view welcome-view">
      <div className="welcome-header">
        <p>Naskenujte QR kód lokace nebo zadejte její kód ručně.</p>
      </div>

      <div className="navigation">
        <div className="actions">
          <Link to="/scan" className="btn btn-primary btn-stretch">Skenovat QR kód</Link>
          <span>nebo</span>
          <form className='form-code' onSubmit={handleManualCodeSubmit}>
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="zadat kód lokace"
              className="code-input"
            />
            <button type="submit" className="btn btn-secondary">Přejít</button>
          </form>
        </div>

        <div className="actions actions--100">
          <Link to="/summary" className="btn btn-secondary btn-block">Zobrazit souhrn</Link>
        </div>
      </div>

      {/* Error Modal */}
      {showErrorModal && createPortal(
        <div className="modal-overlay" onClick={() => setShowErrorModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Neplatný kód</h3>
            <p>{errorMessage}</p>
            <div className="modal-actions">
              <button 
                onClick={() => setShowErrorModal(false)} 
                className="btn btn-primary"
              >
                OK
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default WelcomeView;