import type { Location, Query } from './types';

export const locations: Array<Location> = [
  {
    "id": 1,
    "name": "Robot sbírá bohatství - sladká mise na šachovnici",
    "key": "B110",
    "nextid": 2,
    "nextway": "Pokračujte vedlejšími dveřmi k elektrotechnické laboratoři pro další výzvu."
  },
  {
    "id": 2,
    "name": "Bohatství pod proudem - elektrotechnická výzva",
    "key": "B109",
    "nextid": 3,
    "nextway": "Vydejte se do počítačové laboratoře u východu do dvora na digitální dobrodružství."
  },
  {
    "id": 3,
    "name": "Digitální bohatství - kryptoměny",
    "key": "B124",
    "nextid": 4,
    "nextway": "Navštivte laboratoř mechatroniky vedle prosklených dveří (naproti jídelnímu automatu)."
  },
  {
    "id": 4,
    "name": "Bohatství rukou a hlavy - objev svou vnitřní sílu",
    "key": "B104",
    "nextid": 5,
    "nextway": "Přejděte spojovací chodbou do chytré domácnosti elektro laboratoře na hlavní budově."
  },
  {
    "id": 5,
    "name": "Chytrá domácnost - Bohatství v každé žárovce",
    "key": "A121",
    "nextid": 6,
    "nextway": "Pokračujte chodbou v přízemí směrem k hlavnímu vchodu k dalším otevřeným dveřím."
  },
  {
    "id": 6,
    "name": "Bohatství plánování a strategie",
    "key": "A111",
    "nextid": 7,
    "nextway": "Další dveře vás přivedou do módního ateliéru tradice a hodnot."
  },
  {
    "id": 7,
    "name": "Bohatství v módě - od tradice k moderním hodnotám",
    "key": "A110",
    "nextid": 8,
    "nextway": "V sousedních dveřích navštivte hedvábnou dílnu královských látek."
  },
  {
    "id": 8,
    "name": "Bohatství hedvábí - od housenky ke královské látce",
    "key": "A108",
    "nextid": 9,
    "nextway": "Bonusové stanoviště se nachází ve velké tělocvičně - otevřený vstup je ze školního dvora, na kterém jste dnes začali."
  },
  {
    "id": 9,
    "name": "Bonusové stanoviště - drony ve vzduchu i na zemi",
    "key": "C103",
    "nextid": null,
    "nextway": "Gratulujeme! Dokončili jste průvodce stanovišti Noci vědců. Můžete si vychutnat vlastnoručně opečené občerstvení! U kovárny v areálu za budovou B předložte Souhrn výsledků :-)"
  }
]

export const queries: Array<Query> =
  [
    {
      key: "B110",
      question: "Otázka šachy: Která figura je nejcennější?",
      answers: [
        {
          choice: "A",
          description: "Dáma (královna)",
          isTrue: true
        },
        {
          choice: "B",
          description: "Věž",
          isTrue: false
        },
        {
          choice: "C",
          description: "Jezdec",
          isTrue: false
        }
      ]
    },
    {
      key: "B109",
      question: "Otázka elektrotechnika: Který z následujících materiálů je nejlepším vodičem elektrického proudu?",
      answers: [
        {
          choice: "A",
          description: "Stříbro (Ag)",
          isTrue: true
        },
        {
          choice: "B",
          description: "Měď (Cu)",
          isTrue: false
        },
        {
          choice: "C",
          description: "Hliník (Al)",
          isTrue: false
        },
        {
          choice: "D",
          description: "Zlato (Au)",
          isTrue: false
        }
      ]
    },
    {
      key: "B124",
      question: "Otázka kryptoměny: Jaký je hlavní přínos kryptoměn?",
      answers: [
        {
          choice: "A",
          description: "Snižují náklady na mezinárodní převody peněz díky eliminaci potřeby zprostředkovatelů",
          isTrue: false
        },
        {
          choice: "B",
          description: "Zvyšují transparentnost a bezpečnost finančních transakcí díky decentralizované povaze technologie blockchain",
          isTrue: true
        },
        {
          choice: "C",
          description: "Zvyšují dostupnost finančních služeb pro lidi bez bankovního účtu",
          isTrue: false
        }
      ]
    },
    {
      key: "B104",
      question: "Otázka mechatronika: Jaký je hlavní přínos mechatroniky?",
      answers: [
        {
          choice: "A",
          description: "Zvyšuje konkurenceschopnost firem na trhu díky inovacím a efektivnějším procesům",
          isTrue: false
        },
        {
          choice: "B",
          description: "Umožňuje rychlejší a flexibilnější reakci na změny v poptávce a výrobních podmínkách",
          isTrue: false
        },
        {
          choice: "C",
          description: "Zvyšuje efektivitu a přesnost výrobních procesů prostřednictvím integrace mechanických, elektronických a softwarových systémů",
          isTrue: true
        }
      ]
    },
    {
      key: "A121",
      question: "Otázka chytrá domácnost: Jaký je hlavní přínos chytré domácnosti?",
      answers: [
        {
          choice: "A",
          description: "Zvyšuje pohodlí a efektivitu domácnosti prostřednictvím automatizace a vzdáleného ovládání",
          isTrue: true
        },
        {
          choice: "B",
          description: "Snižuje náklady na energii a údržbu domácnosti",
          isTrue: false
        },
        {
          choice: "C",
          description: "Zvyšuje bezpečnost domácnosti prostřednictvím monitorování a alarmů",
          isTrue: false
        }
      ]
    },
    {
      key: "A111",
      question: "Jak může kyberbezpečnost ovlivnit logistiku?",
      answers: [
        {
          choice: "A",
          description: "Bez zabezpečení dat může dojít ke ztrátě informací o zásilkách nebo objednávkách",
          isTrue: true
        },
        {
          choice: "B",
          description: "Zvyšuje náklady na pojištění zásilek, protože kybernetické hrozby jsou považovány za vyšší riziko",
          isTrue: false
        },
        {
          choice: "C",
          description: "Automaticky synchronizuje sklady s dodavateli prostřednictvím blockchain technologie",
          isTrue: false
        }
      ]
    },
    {
      key: "A110",
      question: "Jak se říká broušené kůži s jemným povrchem?",
      answers: [
        {
          choice: "A",
          description: "Filc",
          isTrue: false
        },
        {
          choice: "B",
          description: "Semiš",
          isTrue: true
        },
        {
          choice: "C",
          description: "Fleece (flís)",
          isTrue: false
        }
      ]
    },
    {
      key: "A108",
      question: "Jaká je celková délka vlákna z jednoho kokonu pravého hedvábí?",
      answers: [
        {
          choice: "A",
          description: "až 500 m",
          isTrue: false
        },
        {
          choice: "B",
          description: "až 1000 m",
          isTrue: false
        },
        {
          choice: "C",
          description: "až 4000 m",
          isTrue: true
        },
        {
          choice: "D",
          description: "až 8000 m",
          isTrue: false
        }
      ]
    },
  ];

export const locations2: Location[] = [
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

export const queries2: Array<Query> =
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