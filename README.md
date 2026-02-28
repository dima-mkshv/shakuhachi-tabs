# 尺八 Shakuhachi Fingering Guide

Interactive fingering reference for the standard 5-hole shakuhachi.

## Features

- **All notes**: Otsu (1st register) and Kan (2nd register), including meri and cross-fingering
- **SVG fingering diagrams**: visual hole charts for every note
- **6 Japanese pentatonic scales**: Miyako-bushi, Hirajoshi, In-sen, Iwato, Yo, Akebono
- **Key transposition**: select your shakuhachi size (1.3–2.8 shaku) and all Western note names update
- **Bilingual**: English / Russian toggle

## Quick start

```bash
# Install dependencies (like pip install -r requirements.txt)
npm install

# Start dev server with hot reload (like flask run --debug)
npm run dev

# Open in browser: http://localhost:5173/
```

## Two commands you need

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start working — opens dev server with hot reload |
| `npm run build` | Create `dist/` folder with static files for hosting |

## Project structure

```
src/
  data/          ← shakuhachi data (notes, scales, sizes, translations)
  utils/         ← transposition function
  context/       ← global state (language, selected key)
  components/    ← reusable UI pieces (fingering SVG, note card, layout)
  pages/         ← one per section (Home, Notes, Chart, Scales)
  App.css        ← all styles
```

## Adding things

- **New scale**: add an object to `src/data/scales.js`
- **New language**: add a key to `src/data/i18n.js`
- **New page**: add component in `src/pages/`, add route in `src/App.jsx`
