import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { locations, queries } from '../data';
import { WayStorage } from '../wayStorage';
import type { Way, Waypoint, Location } from '../types';

type SortOrder = 'completion' | 'expected';

const SummaryView = () => {
  const [way, setWay] = useState<Way>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('expected');

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

  const getAnswerText = (locationKey: string, choice: string | null): string => {
    if (!choice) return '-';
    
    const query = queries.find(q => q.key === locationKey);
    if (!query) return choice;
    
    const answer = query.answers.find(a => a.choice === choice);
    return answer ? `${choice}: ${answer.description}` : choice;
  };

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

      <div className="summary-table">
        <div className="table-header">
          <div className="col-order">
            {sortOrder === 'completion' ? 'Pořadí plnění' : 'Očekávané pořadí'}
          </div>
          <div className="col-location">Lokace</div>
          <div className="col-code">Kód</div>
          <div className="col-answer">Odpověď</div>
          <div className="col-status">Výsledek</div>
        </div>

        {getSortedLocations().map((location) => (
          <div 
            key={location.id} 
            className={`table-row ${getStatusColor(location.waypoint)}`}
          >
            <div className="col-order">
              {sortOrder === 'completion' 
                ? (location.waypoint.order || '-')
                : location.id
              }
            </div>
            <div className="col-location">
              <Link 
                to={`/location/${location.key}`}
                className="location-link"
              >
                {location.name}
              </Link>
            </div>
            <div className="col-code">{location.key}</div>
            <div className="col-answer">
              {getAnswerText(location.key, location.waypoint.choice)}
            </div>
            <div className="col-status">
              <span className="status-icon">
                {getStatusIcon(location.waypoint)}
              </span>
              <span className="status-text">
                {location.waypoint.choice === null 
                  ? 'Nevyřešeno'
                  : (location.waypoint.correct ? 'Správně' : 'Nesprávně')
                }
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="actions">
        <Link to="/location/A001" className="btn btn-primary">
          Restart závodu
        </Link>
        <Link to="/scan" className="btn btn-secondary">
          Skenovat QR kód
        </Link>
      </div>
    </div>
  );
};

export default SummaryView;