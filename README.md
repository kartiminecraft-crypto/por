# UI/UX Designer — Portfolio

Personal portfolio site built with **React 19 + Vite + Tailwind CSS v4**.
Bilingual (EN/UK) with clean routes: `/en`, `/uk`.

Live site: **https://kartiminecraft-crypto.github.io/por/**

## Development

```bash
pnpm install
pnpm dev       # dev server on port 8443
```

## Build

```bash
pnpm build     # outputs to dist/, rooted at /por/ for GitHub Pages
```

## Deployment

Deployment is automatic via GitHub Actions (`.github/workflows/pages.yml`):
every push to `main` builds the site and publishes it to GitHub Pages.
No manual steps needed — just push:

```bash
git push origin main
```

The workflow installs pnpm + Node, runs `pnpm build`, and deploys `dist/`
using the `actions/deploy-pages` action.
