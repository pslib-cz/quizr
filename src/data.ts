import type { Location, Query } from './types';

export const locations: Location[] = [
  {
    id: 1,
    name: "Start - Finanční brána",
    key: "A001",
    nextid: 2,
    nextway: "Pokračujte k budově knihovny, kde najdete další stanoviště"
  },
  {
    id: 2,
    name: "Knihovna - Duševní poklady",
    key: "B123",
    nextid: 3,
    nextway: "Vydejte se k výstavní síni s kulturními exponáty"
  },
  {
    id: 3,
    name: "Výstavní síň - Kulturní dědictví",
    key: "B210",
    nextid: 4,
    nextway: "Projděte do geologické laboratoře s minerály"
  },
  {
    id: 4,
    name: "Geologická laboratoř - Přírodní bohatství",
    key: "B107",
    nextid: 5,
    nextway: "Zamířte do technologického centra vynálezů"
  },
  {
    id: 5,
    name: "Technologické centrum - Inovace",
    key: "B303",
    nextid: 6,
    nextway: "Pokračujte do archeologického oddělení"
  },
  {
    id: 6,
    name: "Archeologické oddělení - Historické poklady",
    key: "A221",
    nextid: 7,
    nextway: "Přejděte do uměleckých dílen a galerií"
  },
  {
    id: 7,
    name: "Umělecká galerie - Krása a tvorba",
    key: "A107",
    nextid: 8,
    nextway: "Vydejte se k biografické expozici významných osobností"
  },
  {
    id: 8,
    name: "Biografická expozice - Lidské talenty",
    key: "C103",
    nextid: 9,
    nextway: "Navštivte kulinářskou dílnu s exotickými ingrediencemi"
  },
  {
    id: 9,
    name: "Chemická laboratoř - Vzácné prvky",
    key: "D001",
    nextid: 10,
    nextway: "Dokončete trasu v chemické laboratoři prvků"
  },
  {
    id: 10,
    name: "Kulinářská dílna - Gastronomické speciality",
    key: "D105",
    nextid: 11,
    nextway: "Gratulujeme! Dokončili jste kvíz. Zasloužíte si občerstvení :-)"
  },
  {
  id: 11,
  name: "Kovárna",
  key: "D106",
  nextid: null,
  nextway: "Gratulujeme! Dokončili jste kvíz. Zasloužíte si občerstvení :-)"
}
];

export const queries: Array<Query> =
  [
    {
      key: "A001",
      question: "Která burza cenných papírů je největší na světě podle tržní kapitalizace?",
      answers: [
        {
          choice: "A",
          description: "Newyorská burza (NYSE)",
          isTrue: true
        },
        {
          choice: "B",
          description: "Londýnská burza (LSE)",
          isTrue: false
        },
        {
          choice: "C",
          description: "Tokijská burza (TSE)",
          isTrue: false
        }
      ]
    },
    {
      key: "B123",
      question: "Která knihovna je považována za největší na světě podle počtu položek?",
      answers: [
        {
          choice: "A",
          description: "Britská knihovna v Londýně",
          isTrue: false
        },
        {
          choice: "B",
          description: "Kongresová knihovna ve Washingtonu",
          isTrue: true
        },
        {
          choice: "C",
          description: "Ruská státní knihovna v Moskvě",
          isTrue: false
        }
      ]
    },
    {
      key: "B210",
      question: "Kolik památek UNESCO se nachází na území České republiky?",
      answers: [
        {
          choice: "A",
          description: "14 památek",
          isTrue: false
        },
        {
          choice: "B",
          description: "17 památek",
          isTrue: true
        },
        {
          choice: "C",
          description: "21 památek",
          isTrue: false
        }
      ]
    },
    {
      key: "B107",
      question: "Který drahý kámen je nejtvrdší na Mohsově stupnici tvrdosti?",
      answers: [
        {
          choice: "A",
          description: "Rubín",
          isTrue: false
        },
        {
          choice: "B",
          description: "Safír",
          isTrue: false
        },
        {
          choice: "C",
          description: "Diamant",
          isTrue: true
        }
      ]
    },
    {
      key: "B303",
      question: "Kdo je považován za vynálezce prvního praktického telefonu?",
      answers: [
        {
          choice: "A",
          description: "Alexander Graham Bell",
          isTrue: true
        },
        {
          choice: "B",
          description: "Thomas Edison",
          isTrue: false
        },
        {
          choice: "C",
          description: "Nikola Tesla",
          isTrue: false
        }
      ]
    },
    {
      key: "A221",
      question: "Ve které hrobce byla objevena největší sbírka zlatých předmětů starověkého Egypta?",
      answers: [
        {
          choice: "A",
          description: "Hrobka Ramesse II.",
          isTrue: false
        },
        {
          choice: "B",
          description: "Hrobka Tutanchamona",
          isTrue: true
        },
        {
          choice: "C",
          description: "Hrobka Cheopsova",
          isTrue: false
        }
      ]
    },
    {
      key: "A107",
      question: "Který obraz je považován za nejdražší kdy prodané umělecké dílo?",
      answers: [
        {
          choice: "A",
          description: "Mona Lisa od Leonarda da Vinciho",
          isTrue: false
        },
        {
          choice: "B",
          description: "Salvator Mundi od Leonarda da Vinciho",
          isTrue: true
        },
        {
          choice: "C",
          description: "Slunečnice od Vincenta van Gogha",
          isTrue: false
        }
      ]
    },
    {
      key: "C103",
      question: "Kdo je podle žebříčku Forbes nejbohatším člověkem světa k září 2025?",
      answers: [
        {
          choice: "A",
          description: "Elon Musk",
          isTrue: true
        },
        {
          choice: "B",
          description: "Jeff Bezos",
          isTrue: false
        },
        {
          choice: "C",
          description: "Bernard Arnault",
          isTrue: false
        }
      ]
    },
    {
      key: "D001",
      question: "Který chemický prvek má nejvyšší cenu za gram?",
      answers: [
        {
          choice: "A",
          description: "Zlato",
          isTrue: false
        },
        {
          choice: "B",
          description: "Platina",
          isTrue: false
        },
        {
          choice: "C",
          description: "Kalifornium",
          isTrue: true
        }
      ]
    },
    {
      key: "D105",
      question: "Která koření je označována jako 'červené zlato' kvůli své vysoké ceně?",
      answers: [
        {
          choice: "A",
          description: "Vanilka",
          isTrue: false
        },
        {
          choice: "B",
          description: "Šafrán",
          isTrue: true
        },
        {
          choice: "C",
          description: "Kardamom",
          isTrue: false
        }
      ]
    }
  ];