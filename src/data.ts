import type { Location, Query } from './types';

export const locations: Location[] = [
  {
    id: 1,
    name: "Start - Hlavní brána",
    key: "A001", 
    nextid: 2,
    nextway: "Jděte směrem k fontáně na náměstí"
  },
  {
    id: 2,
    name: "Fontána na náměstí",
    key: "A123",
    nextid: 3,
    nextway: "Pokračujte k soše na severní straně parku"
  },
  {
    id: 3,
    name: "Socha v parku",
    key: "B456",
    nextid: 4,
    nextway: "Najděte lavičku s výhledem na jezero"
  },
  {
    id: 4,
    name: "Lavička u jezera",
    key: "C789",
    nextid: 5,
    nextway: "Zamířte k rozhledně na kopci"
  },
  {
    id: 5,
    name: "Rozhledna",
    key: "D012",
    nextid: null,
    nextway: "Gratulujeme! Dokončili jste závod."
  }
];

export const queries: Query[] = [
  {
    key: "A001",
    question: "Ve kterém roce byla postavena hlavní brána?",
    answers: [
      { choice: "A", description: "1885", isTrue: false },
      { choice: "B", description: "1892", isTrue: true },
      { choice: "C", description: "1901", isTrue: false }
    ]
  },
  {
    key: "A123",
    question: "Kolik trysky má fontána?",
    answers: [
      { choice: "A", description: "5 trysek", isTrue: false },
      { choice: "B", description: "7 trysek", isTrue: true },
      { choice: "C", description: "9 trysek", isTrue: false }
    ]
  },
  {
    key: "B456",
    question: "Kterou osobnost zobrazuje socha?",
    answers: [
      { choice: "A", description: "T.G. Masaryk", isTrue: true },
      { choice: "B", description: "Karel Čapek", isTrue: false },
      { choice: "C", description: "Jan Neruda", isTrue: false }
    ]
  },
  {
    key: "C789",
    question: "Z jakého materiálu je lavička vyrobena?",
    answers: [
      { choice: "A", description: "Dřevo a kov", isTrue: true },
      { choice: "B", description: "Pouze dřevo", isTrue: false },
      { choice: "C", description: "Beton a kov", isTrue: false }
    ]
  }
];