<p align="center">
  <img src="version-1/public/hero.png" alt="PICHE residential building" width="100%" />
</p>

<h1 align="center">design-piche</h1>

<p align="center">
  Two independent implementations of the <a href="https://piche.lv">PICHE</a> home page —
  a Latvian real-estate developer's marketing site — built side by side so the
  customer can compare and choose one.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/Deploys%20on-Vercel-000000?logo=vercel&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg">
</p>

---

## How it fits together

```mermaid
flowchart LR
    U([Visitor]) --> C["index.html\nchooser"]
    C -->|Version 1| V1["version-1\nNext.js + shadcn/ui\n3D building explorer"]
    C -->|Version 2| V2["version-2\nNext.js\n3D building explorer"]
    V1 --> D1[(Vercel project)]
    V2 --> D2[(Vercel project)]
```

Each version is a fully separate Next.js app that deploys as its own Vercel
project. The chooser is a single static page deployed from the repo root that
previews both live sites side by side and links to whichever one is picked.

## Layout

| Path | What it is |
|---|---|
| [`index.html`](index.html) | Split-screen chooser with live previews of both versions |
| [`version-1/`](version-1) | Next.js + shadcn/ui build, including an interactive 3D building explorer |
| [`version-2/`](version-2) | Next.js build, independently built, also with an interactive 3D building explorer |

Both versions share the same brief (see
[`version-1/PRODUCT.md`](version-1/PRODUCT.md)) — a calm, trustworthy site
where photography and real project data (prices, floor counts, availability)
do the persuading, built around two moments that matter: exploring a
building and completing the contact form.

## Running locally

Each version is a standalone app — install and run from inside its folder:

```bash
cd version-1   # or version-2
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deployment

Each version deploys as its own Vercel project with **Root Directory** set to
that folder (`version-1` or `version-2`). The chooser (`index.html`) deploys
separately from the repo root and links to both live URLs.

## License

MIT — see [LICENSE](LICENSE).
