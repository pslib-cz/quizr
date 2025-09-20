import type { Way, Waypoint } from './types';
import { locations } from './data';

const STORAGE_KEY = 'quizr-way';

export class WayStorage {
  static initializeWay(): Way {
    return locations.map(location => ({
      id: location.id,
      order: null,
      choice: null,
      correct: null
    }));
  }

  static loadWay(): Way {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const way = this.initializeWay();
        this.saveWay(way);
        return way;
      }
      return JSON.parse(stored) as Way;
    } catch (error) {
      console.error('Error loading way from localStorage:', error);
      const way = this.initializeWay();
      this.saveWay(way);
      return way;
    }
  }

  static saveWay(way: Way): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(way));
    } catch (error) {
      console.error('Error saving way to localStorage:', error);
    }
  }

  static updateWaypoint(locationId: number, choice: string, correct: boolean): Way {
    const way = this.loadWay();
    const waypointIndex = way.findIndex(w => w.id === locationId);
    
    if (waypointIndex === -1) {
      console.error('Location not found:', locationId);
      return way;
    }

    // Určit pořadí (order) - pokud ještě není nastaveno
    if (way[waypointIndex].order === null) {
      const maxOrder = Math.max(0, ...way.map(w => w.order || 0));
      way[waypointIndex].order = maxOrder + 1;
    }

    way[waypointIndex].choice = choice;
    way[waypointIndex].correct = correct;
    
    this.saveWay(way);
    return way;
  }

  static resetWay(): Way {
    const way = this.initializeWay();
    this.saveWay(way);
    return way;
  }

  static getWaypointByLocation(locationId: number): Waypoint | null {
    const way = this.loadWay();
    return way.find(w => w.id === locationId) || null;
  }

  static isLocationCompleted(locationId: number): boolean {
    const waypoint = this.getWaypointByLocation(locationId);
    return waypoint?.choice !== null;
  }

  static getCompletedCount(): number {
    const way = this.loadWay();
    return way.filter(w => w.choice !== null).length;
  }
}