import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { locations, queries } from '../data';
import { WayStorage } from '../wayStorage';
import type { Location, Query, Answer } from '../types';

const LocationView = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [location, setLocation] = useState<Location | null>(null);
  const [query, setQuery] = useState<Query | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showOrderWarning, setShowOrderWarning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!code) return;

    // Najít lokaci podle kódu
    const foundLocation = locations.find(loc => loc.key === code);
    if (!foundLocation) {
      // Pokud kód neexistuje, přesměruj na start
      navigate('/', { replace: true });
      return;
    }

    setLocation(foundLocation);

    // Pokud je to startovní lokace (id: 1), resetuj data
    //if (foundLocation.id === 1) {
    //  WayStorage.resetWay();
    //}

    // Najít otázku pro tuto lokaci
    const foundQuery = queries.find(q => q.key === code);
    setQuery(foundQuery || null);

    // Zkontrolovat zda je lokace už dokončená
    const waypoint = WayStorage.getWaypointByLocation(foundLocation.id);
    setIsCompleted(waypoint?.choice !== null);
    setSelectedAnswer(waypoint?.choice || null);

    // Zkontrolovat pořadí - varování pokud se skáče mimo pořadí
    checkOrderWarning(foundLocation);
  }, [code, navigate]);

  const checkOrderWarning = (currentLocation: Location) => {
    if (currentLocation.id === 1) {
      setShowOrderWarning(false);
      return;
    }

    const way = WayStorage.loadWay();
    const expectedPrevious = locations.find(loc => loc.nextid === currentLocation.id);

    if (expectedPrevious) {
      const previousWaypoint = way.find(w => w.id === expectedPrevious.id);
      if (!previousWaypoint?.choice) {
        setShowOrderWarning(true);
      } else {
        setShowOrderWarning(false);
      }
    }
  };

  const handleAnswerSelect = (answer: Answer) => {
    if (isCompleted || !location) return;

    WayStorage.updateWaypoint(location.id, answer.choice, answer.isTrue);
    setSelectedAnswer(answer.choice);
    setIsCompleted(true);
  };

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

  const handleNextLocation = () => {
    if (location?.nextid) {
      const nextLocation = locations.find(loc => loc.id === location.nextid);
      if (nextLocation) {
        navigate(`/location/${nextLocation.key}`);
      }
    }
  };

  if (!location) {
    return <div className="loading">Načítání...</div>;
  }

  // Pokud je to poslední lokace (nextid je null)
  if (location.nextid === null) {
    return (
      <div className="location-view final-location">
        <h2>{location.name}</h2>
        <div className="final-message">
          <p>🎉 Cíl!</p>
          <p>{location.nextway}</p>
        </div>

        <div className="navigation">
          <div className="actions actions--100">
            <Link to="/summary"
              className="btn btn-primary btn-block"
            >Zobrazit souhrn výsledků</Link>
          </div>

          <div className="actions">
            <Link to="/scan" className="btn btn-secondary btn-stretch">Skenovat QR kód</Link>
            <span>nebo</span>
            <form className='form-code' onSubmit={handleManualCodeSubmit}>
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="zadat kód"
                className="code-input"
              />
              <button type="submit" className="btn btn-secondary">Přejít</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="location-view">
      <div className="location-header">
        <h2>{location.name}</h2>
        <div className="location-code">Kód: {location.key}</div>
      </div>

      {showOrderWarning && (
        <div className="warning">
          ⚠️ Upozornění: Aktivovali jste lokaci mimo očekávané pořadí.
          Můžete tak vynechat jednu z předchozích lokací.
        </div>
      )}

      {query && (
        <div className="question-section">
          <h3>{query.question}</h3>

          <div className="answers">
            {query.answers.map((answer) => (
              <button
                key={answer.choice}
                onClick={() => handleAnswerSelect(answer)}
                disabled={isCompleted}
                className={`answer-btn ${selectedAnswer === answer.choice
                    ? (answer.isTrue ? 'correct' : 'incorrect')
                    : ''
                  } ${isCompleted ? 'disabled' : ''}`}
              >
                <span className="choice">{answer.choice}</span>
                <span className="description">{answer.description}</span>
              </button>
            ))}
          </div>

          {isCompleted && (
            <div className="result">
              {query.answers.find(a => a.choice === selectedAnswer)?.isTrue
                ? '✓ Správná odpověď!'
                : '✗ Nesprávná odpověď'
              }
            </div>
          )}
        </div>
      )}

      {isCompleted && location.nextway && (
        <div className="next-instruction">
          <h4>Následující lokace:</h4>
          <p>{location.nextway}</p>
          <button onClick={handleNextLocation} className="btn btn-primary">
            %debug% další lokace
          </button>
        </div>
      )}

      <div className="navigation">
        <div className="actions">
          <Link to="/scan" className="btn btn-primary btn-stretch">Skenovat QR kód</Link>
          <span>nebo</span>
          <form className='form-code' onSubmit={handleManualCodeSubmit}>
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="zadat kód"
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

export default LocationView;