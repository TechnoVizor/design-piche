# Showroom Minimal — Design System

A photography-led, near-decorationless interface system: white canvas, one blue, two type weights, no shadows. It is the design language of a digital showroom, where the product imagery carries all emotional weight and the UI exists only to get out of the way.

## Sources and provenance

Built entirely from one source, a third-party design analysis document:

- **VoltAgent/awesome-design-md**, branch `main`, subtree `design-md/tesla/` — https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/tesla
  - `DESIGN.md` — the full specification: colour roles, type ladder, component stylings, layout, elevation, motion, responsive behaviour, do's and don'ts.
  - `README.md` — points to https://getdesign.md/tesla/design-md for previews and dark-mode examples.

That document is an independent written analysis of a car maker's marketing site. It contains **no logo, no font binaries, no icons, and no imagery** — only prose and numbers. Accordingly this system:

- ships **no logo or wordmark asset**. Anywhere a mark belongs, the brand name is rendered as plain spaced display type (see `SiteHeader`). Nothing was drawn or reconstructed from memory.
- is **not branded** as the analysed company, and deliberately avoids that company's trademarks, model names and vehicle photography. Product names in the UI kits are generic ("Sedan", "SUV", "Truck").
- ships **no photography**. Every image slot is an honest neutral placeholder (`Photo`). This is the single biggest gap: the system is photography-first, so it will look inert until real imagery is supplied.

Explore the repository above (and the getdesign.md previews) for deeper context before extending this system.

### Substitutions to review
| Missing | Substitute | Action needed |
|---|---|---|
| Universal Sans Display / Text (commercial, no binaries) | **Archivo** (display) + **Figtree** (text) from Google Fonts | Supply the real `.woff2` files and swap the `@font-face`/`@import` in `tokens/fonts.css` |
| Icon set (none named in source) | **Lucide** line icons via CDN, 18–20px, ~1.5px stroke | Confirm or replace with the real set |
| All photography | Neutral grey/dark placeholders | Drop real imagery in `assets/` and pass `src` to `Photo` |
| Logo / wordmark | Plain spaced type, "SHOWROOM" | Supply the mark, or keep type-only intentionally |

## Content fundamentals

Copy is engineered, not written. The register is flat, declarative and short — a spec sheet with manners.

- **Casing**: sentence case everywhere, including buttons and nav. No uppercase transforms; the only spaced-uppercase element is the wordmark itself. "Order Now" and "View Inventory" title-case as proper CTA labels; everything else reads as a sentence.
- **Person**: neither "I" nor heavy "you". Copy names the thing and its terms: "0% APR Available", "Delivery This Quarter", "Sport Sedan". Second person appears only in the chat affordance ("Ask a Question").
- **Length**: nav labels are one word ("Vehicles", "Energy", "Charging", "Discover", "Shop"). Links are one word ("Learn", "Order", "Experience"). Hero titles are the product name alone. A screen carries one message.
- **No persuasion vocabulary**: no "revolutionary", no exclamation marks, no questions except the literal chat prompt. Incentives are stated as facts, not offers.
- **Emoji**: never. Not in UI, not in marketing copy.
- **Vibe**: quiet confidence. The restraint *is* the claim. If a sentence could be deleted without losing information, delete it.

## Visual foundations

**Colour.** Monochrome plus one. Electric Blue `#3E6AE1` is the only chromatic value and appears only on primary CTAs and promo text. Text runs Carbon Dark `#171A20` → Graphite `#393C41` → Pewter `#5C5E62` → Silver Fog `#8E8E8E`. Surfaces are Pure White, Light Ash `#F4F4F4`, and Carbon Dark. Borders are Cloud Gray `#EEEEEE` and Pale Silver `#D0D1D2`. There are no semantic status colours at all.

**Type.** Two variants of one family: Display for hero titles (40/48/500) and Text for everything else, which clusters hard at 14px — nav 14/16.8/500, body 14/20/400, buttons 14/16.8/500. Between them sit only product names (17/20/500), category labels (16/500) and promo lines (22/400). Two weights, 400 and 500 — never bold, never light, never italic. Letter-spacing is `normal` at every size, which is unusual and deliberate: no negative tracking on headlines.

**Spacing and layout.** 8px base (4, 8, 16, 21.44, 32, 40, 64 — the 21.44px value is genuine to the source, do not round it). Container max ~1383px, but most content is full-bleed. Major blocks are viewport-height, so one message occupies one screen. The nav dropdown is a 70/30 split: 3-column product grid plus a right link sidebar. Category cards go 2-up, large-left/small-right, 16px gap. Whitespace is the luxury signal — never fill space because it is empty.

**Backgrounds.** White, or a full-bleed photograph. Nothing else. No gradients anywhere, no patterns, no textures, no illustration, no noise. Section differentiation uses Light Ash at most.

**Borders, radii, shadows.** Default radius is 0. Controls are 4px. Photographic cards are 12px with `overflow:hidden`. Carousel dots are circles. Cards have no border and no shadow; separation comes from spacing. Elevation is effectively "none": Level 0 flat is the default, Level 1 is the frosted nav `rgba(255,255,255,.75)` with a blur, Level 2 is the modal overlay `rgba(128,128,128,.65)`, Level 3 is a `rgba(0,0,0,.05)` hint used almost never. Depth comes from z-index, opacity and the photography itself.

**Transparency and blur.** Only two uses: the header's frosted backdrop on scroll, and the carousel arrows' `rgba(255,255,255,.65)` fill so they float over imagery. Never as decoration.

**Motion.** One duration: 0.33s, on every interactive change; box-shadow alone runs 0.25s. Links use `cubic-bezier(0.5,0,0,0.75)`; everything else uses the browser default. Transitions animate colour, background-colour, border-colour and box-shadow — nothing else. No scale, no translate, no bounce, no entrance animation, no parallax.

**Hover and press.** Hover on a primary button darkens the blue; on a secondary it shifts border and background; on a text link it adds an underline and darkens toward Carbon Dark. Nav items gain a faint grey wash. There is no press state beyond the same colour transition — nothing shrinks, nothing lifts. Cards do not react to hover at all; the links inside them do.

**Imagery.** Cinematic, wide, cool-to-neutral in cast, natural light, no grain, no filters, no duotone. Product renders sit on transparent backgrounds over white; environmental shots go full-bleed edge-to-edge. Contrast for overlaid white text comes from choosing a dark region of the image, never from a scrim or protection gradient.

**Fixed elements.** Two, and only two: the sticky header at the top and the persistent chat bar at the bottom. The chat bar's 1px top border is the only visible hairline in the default interface.

## Iconography

The source names no icon system, and no glyph assets existed to copy, so **Lucide** line icons stand in via CDN (`https://unpkg.com/lucide-static@0.544.0/icons/<name>.svg`) — flagged for replacement.

- Style: outline only, ~1.5px stroke, no fills, square corners rounded slightly, monochrome.
- Colour: inherits text colour (Carbon Dark or Pewter). Icons are never blue and never coloured for emphasis; one exception in the source is a teal-ish accent on the "Schedule a Drive" icon, deliberately not reproduced without confirmation.
- Size: 18px in the chat bar and header utilities, 20px maximum. Carousel arrows are glyph chevrons in a 44px square hit area.
- There is no icon font, no sprite sheet, no PNG icons.
- Emoji: never used. Unicode characters are used only for the carousel chevrons (`‹` `›`).
- Icons never appear inside primary CTAs; the one iconed button in the system is the chat bar's secondary CTA.

## Components

Built to the inventory the source document defines — nothing added beyond the two noted below.

| Component | Directory | Role |
|---|---|---|
| `Button` | `components/core/` | Primary / secondary / translucent-over-photography CTA |
| `NavButton` | `components/core/` | Top navigation label, rest / active / light tone |
| `TextLink` | `components/core/` | Tertiary link (Learn, Order, Experience) |
| `Input` | `components/core/` | The system's only form control; borderless variant for the chat bar |
| `VehicleCard` | `components/cards/` | Product tile in the nav dropdown: render, name, two links |
| `CategoryCard` | `components/cards/` | Full-bleed photographic browse card, 12px radius, white label |
| `HeroSection` | `components/media/` | Full-viewport photographic hero with title, promo and CTA pair |
| `Carousel` | `components/media/` | Hero carousel shell: edge arrows and dot indicators |
| `Photo` | `components/media/` | Image frame with neutral placeholder fallback |
| `SiteHeader` | `components/navigation/` | Sticky three-column header, transparent / white / frosted |
| `NavPanel` | `components/navigation/` | Full-width white dropdown, 3-column grid + link sidebar |
| `ChatBar` | `components/navigation/` | Persistent bottom bar: label, input, send, secondary CTA |

### Intentional additions
- **`Photo`** — the source supplies no imagery but the system depends on it entirely; this gives every image slot an honest placeholder instead of a broken `img`.
- **`Carousel`** — described in the source as behaviour (auto-advance, dots, edge arrows) rather than as a named component; packaged here so hero slides compose.

## Index

- `styles.css` — the single entry point consumers link. `@import` lines only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radii.css`, `motion.css`, `elevation.css`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand groups).
- `components/core|cards|media|navigation/` — the components above, each with `.d.ts` and `.prompt.md`, plus one card HTML per directory.
- `ui_kits/showroom-site/` — click-through marketing site recreation (`index.html`, `SiteChrome.jsx`, `HomeScreen.jsx`, `BrowseScreen.jsx`, `README.md`).
- `assets/` — empty by design: no logo, icons or imagery were provided. See Substitutions.
- `github.md` — source repository association for upstream sync.
- `SKILL.md` — agent-skill entry point.

No slide template was provided, so no sample slides exist. Only one product surface is documented in the source, so there is one UI kit.
