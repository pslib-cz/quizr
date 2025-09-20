# Quizr - PWA Orientační závod

Progresivní webová aplikace (PWA) pro orientační závod s kvízovými otázkami.

## Funkce

- 📱 **PWA podpora** - funguje offline, lze nainstalovat jako aplikace
- 📍 **Aktivace lokací** - pomocí kódů (A123) nebo QR kódů
- ❓ **Kvízové otázky** - na každé lokaci jedna otázka s výběrem odpovědí
- 📊 **Souhrn výsledků** - přehled všech lokací s možností řazení
- 📷 **QR scanner** - čtení QR kódů přímo v aplikaci
- 💾 **Local Storage** - ukládání postupu do lokálního úložiště
- 🔄 **Hash router** - spolehlivé nasazení na GitHub Pages

## Technologie

- **Vite** - build tool
- **React 18** - UI framework
- **TypeScript** - typová bezpečnost
- **React Router** - routing s HashRouter
- **qr-scanner** - čtení QR kódů
- **vite-plugin-pwa** - PWA funkcionalita

## Použití

### Spuštění ve vývoji

```bash
npm install
npm run dev
```

### Build pro produkci

```bash
npm run build
npm run preview
```

### Nasazení na GitHub Pages

1. Nastavte v `vite.config.ts` správnou `base` URL
2. Spusťte build: `npm run build`
3. Nahrajte obsah `dist` složky na GitHub Pages

## Funkce aplikace

### Aktivace lokace

Lokaci lze aktivovat třemi způsoby:

1. **Přímý přechod** - klikem na tlačítko "Pokračovat na další lokaci"
2. **Manuální zadání** - vyplněním kódu do formuláře
3. **QR kód** - naskenováním QR kódu s URL nebo kódem

### QR kódy

Podporované formáty QR kódů:

- **URL formát**: `https://pslib-cz.github.io/quizr/#/code/A123`
- **Kód formát**: `A123`

### Pořadí lokací

- Lokace mají definované pořadí pomocí `nextid`
- Při aktivaci mimo pořadí se zobrazí varování
- Startovní lokace (id: 1) resetuje data
- Poslední lokace (nextid: null) zobrazí tlačítko na souhrn

## Licence

MIT License
