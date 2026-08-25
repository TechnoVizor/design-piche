# design-piche

Two implementations of the PICHE home page, built for the customer to choose
between.

- `index.html` — chooser page linking to both versions.
- `version-1/` — React + Next.js + shadcn/ui, built from the PICHE Home Page
  design file (`Implement: PICHE Home Page.dc.html`), including the
  interactive 3D building explorer.
- `version-2/` — reserved for a second, independently-built implementation.

Each version deploys as its own Vercel project (Root Directory set to that
folder); the chooser deploys separately from the repo root.
