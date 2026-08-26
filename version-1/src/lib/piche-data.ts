export type Project = {
  id: string;
  href: string;
  image: string;
  credit: string;
  creditHref: string;
  location: string;
  status: string;
  name: string;
  meta: string;
};

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    href: "#explore",
    image: "/images/piche/project-priezu-apartments.webp",
    credit: "Concept visualization",
    creditHref: "",
    location: "Mārupe",
    status: "In sales",
    name: "Priežu Rezidences apartments",
    meta: "Mežciema iela, Mārupe · 1–4 bedrooms · from 129 000 €",
  },
  {
    id: "project-2",
    href: "#explore",
    image: "/images/piche/project-priezu-row-houses.webp",
    credit: "Concept visualization",
    creditHref: "",
    location: "Mārupe",
    status: "In sales",
    name: "Priežu Rezidences row houses",
    meta: "Mežciema iela, Mārupe · 4–5 rooms · from 235 000 €",
  },
  {
    id: "project-3",
    href: "#projects",
    image: "/images/piche/project-mezaparks-voxel.webp",
    credit: "Minecraft-style concept",
    creditHref: "",
    location: "Rīga",
    status: "Coming soon",
    name: "Mežaparka rezidences",
    meta: "Mežaparks, Rīga · apartments · in design",
  },
  {
    id: "project-4",
    href: "#projects",
    image: "/images/piche/project-kruminsala-voxel.webp",
    credit: "Minecraft-style concept",
    creditHref: "",
    location: "Mārupe",
    status: "Coming soon",
    name: "Krūmiņsala 29",
    meta: "Krūmiņsala, Mārupe · row houses · in design",
  },
];

export const NEWS = [
  {
    id: "news-1",
    image: "/images/piche/news-construction.webp",
    credit: "Concept visualization",
    creditHref: "",
    date: "12 August 2026 · Priežu Rezidences",
    title: "Construction of the apartment building reaches the top floor",
  },
  {
    id: "news-2",
    image: "/images/piche/news-move-in.webp",
    credit: "Concept visualization",
    creditHref: "",
    date: "28 July 2026 · Row houses",
    title: "First row house families move into the pine forest neighbourhood",
  },
  {
    id: "news-3",
    image: "/images/piche/news-smart-access.webp",
    credit: "Concept visualization",
    creditHref: "",
    date: "6 July 2026 · Technology",
    title: "Smart home access by fingerprint recognition in every apartment",
  },
];

export const SOCIAL_IMAGES = [
  {
    id: "social-1",
    image: "/images/piche/social-balcony.webp",
    credit: "Concept visualization",
    creditHref: "",
  },
  {
    id: "social-2",
    image: "/images/piche/social-playground.webp",
    credit: "Concept visualization",
    creditHref: "",
  },
  {
    id: "social-3",
    image: "/images/piche/social-interior.webp",
    credit: "Concept visualization",
    creditHref: "",
  },
  {
    id: "social-4",
    image: "/images/piche/social-material.webp",
    credit: "Concept visualization",
    creditHref: "",
  },
];

export const BANKS = [
  {
    name: "Swedbank",
    href: "https://www.swedbank.lv/private/credit/loans/home",
    logo: "/images/banks/swedbank.svg",
    logoWidth: 216,
    logoHeight: 48,
    logoClass: "max-h-8 max-w-[132px]",
  },
  {
    name: "Bigbank",
    href: "https://www.bigbank.lv/privatpersonam/hipotekarais-aizdevums/",
    logo: "/images/banks/bigbank.png",
    logoWidth: 1060,
    logoHeight: 360,
    logoClass: "max-h-10 max-w-[136px]",
  },
  {
    name: "ALTUM",
    href: "https://www.altum.lv/en/services/individuals/",
    logo: "/images/banks/altum.svg",
    logoWidth: 111,
    logoHeight: 48,
    logoClass: "max-h-9 max-w-[108px]",
  },
  {
    name: "Citadele",
    href: "https://www.citadele.lv/lv/private/mortgage/",
    logo: "/images/banks/citadele.svg",
    logoWidth: 100,
    logoHeight: 50,
    logoClass: "max-h-10 max-w-20",
  },
  {
    name: "SEB",
    href: "https://www.seb.lv/privatpersonam/krediti/majokla-kredits",
    logo: "/images/banks/seb.svg",
    logoWidth: 120,
    logoHeight: 120,
    logoClass: "max-h-11 max-w-11",
  },
  {
    name: "Luminor",
    href: "https://www.luminor.lv/en",
    logo: "/images/banks/luminor.svg",
    logoWidth: 1091,
    logoHeight: 244,
    logoClass: "max-h-8 max-w-[132px]",
  },
];

/* ------------------------------------------------------------------ *
 * Sites — the four PICHE developments, each with a real map location
 * and its own arrangement of buildings for the 3D view.
 * ------------------------------------------------------------------ */

/** How a facade reads: pale render, warm render, or brick. */
export type Facade = "stucco" | "renderWarm" | "brick";
/** Balcony treatment repeated on every non-entrance bay. */
export type Balcony = "projecting" | "loggia" | "none";
/** What sits on top: plain deck, sedum planting, or a furnished terrace. */
export type RoofKind = "flat" | "green" | "terrace";
export type BuildingKind = "apartment" | "row";

export type Building = {
  id: string;
  name: string;
  kind: BuildingKind;
  /** Storeys. Row terraces are always 2. */
  floors: number;
  /** Apartments per floor per side, or sections along a row terrace. */
  bays: number;
  depth: number;
  x: number;
  z: number;
  rot: number;
  facade: Facade;
  /** Stairwell stripe colour, as in the Krūmiņsala/Priežu references. */
  accent?: number;
  balcony: Balcony;
  roof: RoofKind;
  /** 1-based bay that carries the entrance instead of a balcony. */
  entranceBay: number;
};

export type Site = {
  id: string;
  name: string;
  location: string;
  status: string;
  blurb: string;
  /** [longitude, latitude] — Leaflet wants them the other way round. */
  coords: [number, number];
  /** Ground dressing for the 3D scene. */
  terrain: "forest" | "urban" | "waterside";
  priceBase: number;
  pricePerM2: number;
  buildings: Building[];
};

const PANEL_RUST = 0x8c4a3f;
const PANEL_CLAY = 0x9d6247;

export const SITES: Site[] = [
  {
    id: "priezu-apartments",
    name: "Priežu Rezidences apartments",
    location: "Mārupe",
    status: "In sales",
    blurb: "Three angled blocks around a planted courtyard, ringed by pines.",
    coords: [23.999, 56.882],
    terrain: "forest",
    priceBase: 129000,
    pricePerM2: 1650,
    buildings: [
      { id: "A", name: "Building A", kind: "apartment", floors: 4, bays: 3, depth: 9.4, x: -16, z: 6, rot: 0.5, facade: "renderWarm", accent: PANEL_RUST, balcony: "projecting", roof: "flat", entranceBay: 2 },
      { id: "B", name: "Building B", kind: "apartment", floors: 5, bays: 3, depth: 9.4, x: 0, z: -7, rot: 0, facade: "renderWarm", accent: PANEL_RUST, balcony: "projecting", roof: "flat", entranceBay: 2 },
      { id: "C", name: "Building C", kind: "apartment", floors: 4, bays: 3, depth: 9.4, x: 16, z: 6, rot: -0.5, facade: "renderWarm", accent: PANEL_RUST, balcony: "projecting", roof: "flat", entranceBay: 2 },
    ],
  },
  {
    id: "priezu-row-houses",
    name: "Priežu Rezidences row houses",
    location: "Mārupe",
    status: "In sales",
    blurb: "Three two-storey terraces, each section with its own garden.",
    coords: [23.968, 56.897],
    terrain: "forest",
    priceBase: 235000,
    pricePerM2: 1480,
    buildings: [
      { id: "R", name: "Terrace R", kind: "row", floors: 2, bays: 4, depth: 8.2, x: -18, z: -12, rot: 0, facade: "stucco", accent: PANEL_CLAY, balcony: "none", roof: "flat", entranceBay: 0 },
      { id: "S", name: "Terrace S", kind: "row", floors: 2, bays: 4, depth: 8.2, x: 18, z: -12, rot: 0, facade: "stucco", accent: PANEL_CLAY, balcony: "none", roof: "flat", entranceBay: 0 },
      { id: "T", name: "Terrace T", kind: "row", floors: 2, bays: 5, depth: 8.2, x: 0, z: 14, rot: 0, facade: "renderWarm", accent: PANEL_CLAY, balcony: "none", roof: "green", entranceBay: 0 },
    ],
  },
  {
    id: "mezaparka-rezidences",
    name: "Mežaparka rezidences",
    location: "Rīga",
    status: "Coming soon",
    blurb: "A U-shaped block folded around a green courtyard, roof terraces above.",
    coords: [24.152, 56.996],
    terrain: "urban",
    priceBase: 168000,
    pricePerM2: 2240,
    buildings: [
      { id: "N", name: "North wing", kind: "apartment", floors: 6, bays: 5, depth: 9.4, x: 0, z: -20, rot: 0, facade: "stucco", balcony: "loggia", roof: "terrace", entranceBay: 3 },
      { id: "W", name: "West wing", kind: "apartment", floors: 4, bays: 6, depth: 9.4, x: -22, z: 1, rot: Math.PI / 2, facade: "stucco", balcony: "loggia", roof: "green", entranceBay: 2 },
      { id: "E", name: "East wing", kind: "apartment", floors: 5, bays: 5, depth: 9.4, x: 22, z: 1, rot: -Math.PI / 2, facade: "stucco", balcony: "projecting", roof: "terrace", entranceBay: 4 },
    ],
  },
  {
    id: "kruminsala-29",
    name: "Krūmiņsala 29",
    location: "Rīga",
    status: "Coming soon",
    blurb: "An L of brick volumes on the island edge, with a smaller pavilion.",
    coords: [24.205, 56.921],
    terrain: "waterside",
    priceBase: 152000,
    pricePerM2: 1960,
    buildings: [
      { id: "K", name: "Building K", kind: "apartment", floors: 4, bays: 6, depth: 9.4, x: -6, z: -15, rot: 0, facade: "brick", accent: PANEL_RUST, balcony: "projecting", roof: "flat", entranceBay: 3 },
      { id: "L", name: "Building L", kind: "apartment", floors: 4, bays: 4, depth: 9.4, x: -24, z: 5, rot: Math.PI / 2, facade: "brick", accent: PANEL_RUST, balcony: "projecting", roof: "green", entranceBay: 2 },
      { id: "M", name: "Pavilion M", kind: "apartment", floors: 3, bays: 3, depth: 8.4, x: 17, z: 8, rot: -0.3, facade: "stucco", balcony: "loggia", roof: "terrace", entranceBay: 2 },
    ],
  },
];

export const SITE_BY_ID = new Map(SITES.map((s) => [s.id, s]));

export type Unit = {
  id: string;
  site: string;
  building: string;
  floor: number;
  /** 1-based bay within the floor — the geometry keys off this. */
  bay: number;
  name: string;
  rooms: number;
  area: number;
  price: number;
  status: "available" | "reserved" | "sold";
};

const STATUSES: Unit["status"][] = [
  "available",
  "available",
  "reserved",
  "sold",
  "available",
  "sold",
  "reserved",
  "available",
  "available",
];

/** Deterministic, so the server and client agree on every price and status. */
export function buildUnits(site: Site): Unit[] {
  const units: Unit[] = [];
  let k = 0;
  for (const b of site.buildings) {
    if (b.kind === "row") {
      for (let u = 1; u <= b.bays; u++) {
        const rooms = u % 2 === 0 ? 5 : 4;
        const area = 112 + (u % 3) * 9;
        units.push({
          id: `${b.id}-1-${u}`,
          site: site.id,
          building: b.id,
          floor: 1,
          bay: u,
          name: `House ${b.id}${u}`,
          rooms,
          area,
          price: site.priceBase + Math.round(area * site.pricePerM2),
          status: STATUSES[k++ % STATUSES.length],
        });
      }
      continue;
    }
    for (let f = 1; f <= b.floors; f++) {
      for (let u = 1; u <= b.bays; u++) {
        const rooms = ((u + f) % 3) + 2;
        const area = 48 + ((u * 17) % 46) + f * 2;
        units.push({
          id: `${b.id}-${f}-${u}`,
          site: site.id,
          building: b.id,
          floor: f,
          bay: u,
          name: `Apartment ${b.id}${f}0${u}`,
          rooms,
          area,
          price:
            site.priceBase + Math.round(area * site.pricePerM2 + f * 4200),
          status: STATUSES[k++ % STATUSES.length],
        });
      }
    }
  }
  return units;
}

export function formatMoney(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
}
