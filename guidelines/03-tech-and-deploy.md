# 03 — Tech stack & deploy

The repo must keep building with `npm run build` and deploy to **Vercel** with zero config changes.

## Stack (do not swap)

- **Vite + React + TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/vite` (already configured; styles in `src/index.css`)
- **Routing**: `react-router-dom` (`BrowserRouter`) when there are 2+ screens.
  `vercel.json` already rewrites all paths to `index.html`, so deep links work.
- No other dependencies without a reason written in `project/BRIEF.md`.

## Folder structure

```
src/
  main.tsx            # entry, do not rename
  App.tsx             # router + layout shell
  index.css           # Tailwind import + tiny base styles
  components/         # shared UI: Placeholder, Note, PhoneFrame, nav, buttons…
  screens/            # one file per screen: DashboardScreen.tsx, SettingsScreen.tsx…
  data/               # typed mock data
project/
  BRIEF.md            # the filled-in brief (source of truth)
```

## Rules

- Do not add a Tailwind CDN `<script>` to `index.html`; Tailwind is compiled at build time.
- Do not use an import map in `index.html`; dependencies go in `package.json`.
- Keep `package.json` scripts `dev`, `build`, `preview` working.
- Do not commit secrets. If an AI feature is requested, read the key from an environment variable
  and document it in `project/BRIEF.md`.

## Deploy

- Vercel settings: Framework preset **Vite**, build command `npm run build`, output `dist`.
- Every push to `main` from AI Studio triggers a Vercel deploy once the repo is linked.
