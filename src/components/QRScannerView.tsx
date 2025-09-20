import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import QrScanner from 'qr-scanner';

const QRScannerView = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScanResult = useCallback((data: string) => {
    console.log('QR Code scanned:', data);
    
    // Pokud je to URL ve formátu https://pslib-cz.github.io/quizr/#/code/A123
    const urlMatch = data.match(/\/code\/([A-Z0-9]+)/);
    if (urlMatch) {
      const code = urlMatch[1];
      navigate(`/location/${code}`);
      return;
    }

    // Pokud je to jen kód (A123)
    const codeMatch = data.match(/^[A-Z][0-9]{3}$/);
    if (codeMatch) {
      navigate(`/location/${data}`);
      return;
    }

    // Pokud to není rozpoznaný formát
    setError(`Neplatný QR kód: ${data}`);
    setTimeout(() => setError(null), 3000);
  }, [navigate]);

  useEffect(() => {
    let currentScanner: QrScanner | null = null;

    const initScanner = async () => {
      if (!videoRef.current) return;

      try {
        // Zkontrolovat dostupnost kamery
        const hasCamera = await QrScanner.hasCamera();
        setHasCamera(hasCamera);
        
        if (!hasCamera) {
          setError('Kamera není dostupná na tomto zařízení');
          return;
        }

        currentScanner = new QrScanner(
          videoRef.current,
          (result) => handleScanResult(result.data),
          {
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        );

        setScanner(currentScanner);
        await currentScanner.start();
        setIsScanning(true);
        setError(null);
      } catch (err) {
        console.error('Error initializing QR scanner:', err);
        setError('Chyba při inicializaci skeneru. Zkontrolujte oprávnění kamery.');
        setHasCamera(false);
      }
    };

    initScanner();

    return () => {
      if (currentScanner) {
        currentScanner.stop();
        currentScanner.destroy();
      }
    };
  }, [handleScanResult]);

  const stopScanning = () => {
    if (scanner) {
      scanner.stop();
      setIsScanning(false);
    }
  };

  const startScanning = async () => {
    if (scanner) {
      try {
        await scanner.start();
        setIsScanning(true);
        setError(null);
      } catch (err) {
        console.error('Error starting scanner:', err);
        setError('Chyba při spuštění skeneru');
      }
    }
  };

  if (!hasCamera) {
    return (
      <div className="qr-scanner-view">
        <div className="scanner-header">
          <h2>QR Skener</h2>
        </div>
        
        <div className="scanner-error">
          <p>❌ Kamera není dostupná na tomto zařízení</p>
          <p>Můžete zadat kód manuálně pomocí formuláře na stránce lokace.</p>
        </div>

        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-scanner-view">
      <div className="scanner-header">
        <h2>QR Skener</h2>
        <p>Nasměrujte kameru na QR kód</p>
      </div>

      <div className="scanner-container">
        <video
          ref={videoRef}
          className="scanner-video"
          playsInline
          muted
        />
        
        {error && (
          <div className="scanner-error">
            {error}
          </div>
        )}
      </div>

      <div className="scanner-controls">
        {isScanning ? (
          <button onClick={stopScanning} className="btn btn-secondary">
            Zastavit skenování
          </button>
        ) : (
          <button onClick={startScanning} className="btn btn-primary">
            Spustit skenování
          </button>
        )}
      </div>

      <div className="scanner-info">
        <h3>Podporované formáty:</h3>
        <ul>
          <li>URL: https://pslib-cz.github.io/quizr/#/code/A123</li>
          <li>Kód: A123</li>
        </ul>
      </div>

      <div className="actions">
        <Link to="/" className="btn btn-secondary">
          Zpět na hlavní stránku
        </Link>
        <Link to="/summary" className="btn btn-secondary">
          Zobrazit souhrn
        </Link>
      </div>
    </div>
  );
};

export default QRScannerView;