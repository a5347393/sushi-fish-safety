# 迴轉壽司魚類重金屬速查

Mobile-first Traditional Chinese web app for quick mercury / heavy-metal safety lookup of common conveyor-belt sushi fish.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Static data only (no backend)

## Features

- Typeahead search across Chinese / Japanese / English names and aliases
- Color-coded tiers: 較安心 / 適量 / 少吃 / 孕婦嬰幼兒避開
- Tier filter chips + 孕婦／嬰幼兒 mode (stricter display mapping)
- Expandable cards with adult / pregnancy / infant advice (zh-TW)
- Light CSS/SVG swimming fish animations
- Educational disclaimer citing FDA/EPA-style public fish advice

## Develop

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

## Build

```bash
npm run build
```

## Data

Fish entries live in `src/data/fish.ts`. Tiers loosely follow U.S. FDA/EPA *Advice about Eating Fish* categories. Species on Taiwan sushi menus can vary by supplier—when uncertain the dataset notes it and leans cautious for pregnancy.

## Disclaimer

Educational only — not medical advice.
