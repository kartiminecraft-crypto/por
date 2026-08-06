# UI/UX Designer — Portfolio

Personal portfolio site built with **React 19 + Vite + Tailwind CSS v4**.

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

The live site is served from the `gh-pages` branch (contents of `dist/`).
To update it after a change:

```bash
pnpm build
git push origin main      # commit source changes
git push origin gh-pages  # update the deployed build
```
