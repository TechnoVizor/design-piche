# Product

## Register

brand

## Users
Prospective home buyers in Latvia (primarily Rīga and Mārupe) researching new
apartments and row houses — comparing projects, checking prices/availability,
and deciding whether to book a viewing. A smaller segment is diligence-minded:
checking PICHE's track record as a developer before committing, or looking up
financing partners and contact details. Most arrive from search or a link and
scan quickly; the site needs to build confidence fast and get them to the
contact form or a viewing request with minimal friction.

## Product Purpose
The public marketing site for PICHE, a Latvian real estate developer. It
showcases current and upcoming residential projects, lets buyers explore a
building in 3D down to the individual apartment (price, status, floor plan),
and converts interest into a viewing request or message. Success looks like:
a visitor understands what's available and where within seconds, can explore
a specific building/unit without confusion, and completes the contact form.

## Brand Personality
Trustworthy, modern, calm. Confident but understated — a 20-year, proven
developer selling family homes, not a hype-driven startup. Voice is plain and
direct (plain-language project names, real addresses, real numbers), never
exclamatory. Photography of real buildings and real data (prices, floor
counts, unit counts) carry the credibility; chrome stays quiet.

## Anti-references
Generic AI-template/SaaS scaffolding: gradient text, tiny uppercase "eyebrow"
labels above every section, numbered 01/02/03 section markers, the
big-number-plus-label hero-metric block, identical icon+heading+text card
grids, glassmorphism used decoratively. Keep building on the current
direction (the Pinboard-derived token system already in `globals.css`) rather
than introducing a new visual language.

## Design Principles
- Photography and real building/unit data do the persuading — decoration
  never competes with them.
- One brand accent (blue), spent deliberately on actions and selection state,
  never decorative.
- Calm confidence over hype: no exclamation marks, no manufactured urgency.
- The 3D explorer and the contact form are the two moments that matter most —
  they should feel immediately usable with no instructions beyond the single
  hint line already on screen.
- Motion explains state changes (selection, hover, scroll position); it never
  gates content visibility or exists purely for flourish.

## Accessibility & Inclusion
Target WCAG 2.1 AA. Every animation ships a `prefers-reduced-motion`
alternative (crossfade or instant, never "no transition at all" if that would
snap-hide content). Body text keeps ≥4.5:1 contrast against its surface,
including muted/placeholder text. Interactive controls (chips, buttons, the
3D canvas) remain keyboard- and focus-visible-reachable.
