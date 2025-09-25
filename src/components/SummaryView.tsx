import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
//import { locations, queries } from '../data';
import { locations } from '../data';
import { WayStorage } from '../wayStorage';
import type { Way, Waypoint, Location } from '../types';

type SortOrder = 'completion' | 'expected';

const SummaryView = () => {
  const [way, setWay] = useState<Way>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('expected');
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentWay = WayStorage.loadWay();
    setWay(currentWay);
  }, []);

  const getSortedLocations = (): (Location & { waypoint: Waypoint })[] => {
    const locationsWithWaypoints = locations.map(location => ({
      ...location,
      waypoint: way.find(w => w.id === location.id) || {
        id: location.id,
        order: null,
        choice: null,
        correct: null
      }
    }));

    if (sortOrder === 'completion') {
      return locationsWithWaypoints.sort((a, b) => {
        // Nevyřešené na konec
        if (a.waypoint.order === null && b.waypoint.order === null) {
          return a.id - b.id;
        }
        if (a.waypoint.order === null) return 1;
        if (b.waypoint.order === null) return -1;
        
        return a.waypoint.order - b.waypoint.order;
      });
    } else {
      // Řazení podle očekávaného pořadí (id)
      return locationsWithWaypoints.sort((a, b) => a.id - b.id);
    }
  };

  // const getAnswerText = (locationKey: string, choice: string | null): string => {
  //   if (!choice) return '-';
    
  //   const query = queries.find(q => q.key === locationKey);
  //   if (!query) return choice;
    
  //   const answer = query.answers.find(a => a.choice === choice);
  //   return answer ? `${choice}: ${answer.description}` : choice;
  // };

  const getStatusColor = (waypoint: Waypoint): string => {
    if (waypoint.choice === null) return 'not-attempted';
    return waypoint.correct ? 'correct' : 'incorrect';
  };

  const getStatusIcon = (waypoint: Waypoint): string => {
    if (waypoint.choice === null) return '⏸️';
    return waypoint.correct ? '✅' : '❌';
  };

  const completedCount = way.filter(w => w.choice !== null).length;
  const correctCount = way.filter(w => w.correct === true).length;

  const handleResetConfirm = () => {
    WayStorage.resetWay();
    setShowResetModal(false);
    navigate('/');
  };

  const handleResetCancel = () => {
    setShowResetModal(false);
  };

  return (
    <div className="summary-view">
      <div className="summary-header">
        <h2>Souhrn výsledků</h2>
        <div className="stats">
          <div className="stat">
            <span className="stat-label">Dokončeno:</span>
            <span className="stat-value">{completedCount}/{locations.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Správně:</span>
            <span className="stat-value">{correctCount}/{completedCount || 1}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Úspěšnost:</span>
            <span className="stat-value">
              {completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      <div className="sort-controls">
        <label>
          Řadit podle:
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="sort-select"
          >
            <option value="expected">Očekávaného pořadí</option>
            <option value="completion">Pořadí plnění</option>
          </select>
        </label>
      </div>

      <table className="summary-table">
        <thead>
          <tr className="table-header">
            <th className="col-order">
              {/* {sortOrder === 'completion' ? 'Pořadí plnění' : 'Očekávané pořadí'} */}
              #
            </th>
            <th className="col-location">Lokace</th>
            <th className="col-code">Kód</th>
            {/* <th className="col-answer">Odpověď</th> */}
            <th className="col-status">Výsledek</th>
          </tr>
        </thead>
        <tbody>
        {getSortedLocations().map((location) => (
          <tr 
            key={location.id} 
            className={`table-row ${getStatusColor(location.waypoint)}`}
          >
            <th className="col-order">
              {
                // sortOrder === 'completion' 
                //   ? (location.waypoint.order || '-')
                //   : location.id
                location.id
              }
            </th>
            <td className="col-location">
              {location.waypoint.choice === null 
                ? location.name
                : <Link to={`/location/${location.key}`} className="location-link">{location.name}</Link>
              }
            </td>
            <td className="col-code">
              {location.waypoint.choice === null 
                ? "\u2014"
                : location.key
              }
            </td>
            {/* <td className="col-answer">
              {getAnswerText(location.key, location.waypoint.choice)}
            </td> */}
            <td className="col-status">
              <span className="status-icon" title={location.waypoint.choice === null 
                  ? 'Nevyřešeno'
                  : (location.waypoint.correct ? 'Správně' : 'Nesprávně')
                }>
                {getStatusIcon(location.waypoint)}
              </span>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <div className="actions actions--100">
        <Link to="/scan" className="btn btn-secondary">
          Skenovat QR kód
        </Link>
        <button 
          onClick={() => setShowResetModal(true)} 
          className="btn btn-primary"
        >
          Restart mise
        </button>
      </div>

      {/* Modal pro potvrzení restartu */}
      {showResetModal && createPortal(
        <div className="modal-overlay" onClick={handleResetCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Potvrdit restart</h3>
            <p>
              Opravdu chcete restartovat závod? 
              <br />
              Všechny dosavadní odpovědi budou ztraceny.
            </p>
            <div className="modal-actions">
              <button 
                onClick={handleResetCancel} 
                className="btn btn-secondary"
              >
                Zrušit
              </button>
              <button 
                onClick={handleResetConfirm} 
                className="btn btn-primary"
              >
                Ano, restartovat
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default SummaryView;