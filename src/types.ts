export interface Answer {
  choice: string;
  description: string;
  isTrue: boolean;
}

export interface Query {
  key: string;
  question: string;
  answers: Array<Answer>;
}

export interface Location {
  id: number;
  name: string;
  key: string;
  nextid: number | null;
  nextway: string;
}

export interface Waypoint {
  id: number;
  order: number | null;
  choice: string | null;
  correct: boolean | null;
}

export type Way = Array<Waypoint>;