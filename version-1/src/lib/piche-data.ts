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
    image:
      "https://images.unsplash.com/photo-1768638687896-35bde623d532?auto=format&fit=crop&crop=entropy&q=70&w=900&h=900",
    credit: "Photo by Maximilian Bungart on Unsplash",
    creditHref: "https://unsplash.com/@hypernature",
    location: "Mārupe",
    status: "In sales",
    name: "Priežu Rezidences apartments",
    meta: "Mežciema iela, Mārupe · 1–4 bedrooms · from 129 000 €",
  },
  {
    id: "project-2",
    href: "#explore",
    image:
      "https://images.unsplash.com/photo-1757372429876-ebeda13edfab?auto=format&fit=crop&crop=entropy&q=70&w=900&h=900",
    credit: "Photo by Sebastian Schuster on Unsplash",
    creditHref: "https://unsplash.com/@sschusterphotoart",
    location: "Mārupe",
    status: "In sales",
    name: "Priežu Rezidences row houses",
    meta: "Mežciema iela, Mārupe · 4–5 rooms · from 235 000 €",
  },
  {
    id: "project-3",
    href: "#projects",
    image:
      "https://images.unsplash.com/photo-1759845565036-cbecbcfcb8e2?auto=format&fit=crop&crop=right&q=70&w=900&h=900",
    credit: "Photo by Joachim Lesne on Unsplash",
    creditHref: "https://unsplash.com/@joaching",
    location: "Rīga",
    status: "Coming soon",
    name: "Mežaparka rezidences",
    meta: "Mežaparks, Rīga · apartments · in design",
  },
  {
    id: "project-4",
    href: "#projects",
    image:
      "https://images.unsplash.com/photo-1743878206228-5f36b5f5c830?auto=format&fit=crop&crop=entropy&q=70&w=900&h=900",
    credit: "Photo by Sarlote Laura Jevdokimova on Unsplash",
    creditHref: "https://unsplash.com/@laurlota",
    location: "Mārupe",
    status: "Coming soon",
    name: "Krūmiņsala 29",
    meta: "Krūmiņsala, Mārupe · row houses · in design",
  },
];

export const NEWS = [
  {
    id: "news-1",
    image:
      "https://images.unsplash.com/photo-1757372429876-ebeda13edfab?auto=format&fit=crop&crop=top&q=70&w=1200&h=900",
    credit: "Photo by Sebastian Schuster on Unsplash",
    creditHref: "https://unsplash.com/@sschusterphotoart",
    date: "12 August 2026 · Priežu Rezidences",
    title: "Construction of the apartment building reaches the top floor",
  },
  {
    id: "news-2",
    image:
      "https://images.unsplash.com/photo-1743878206228-5f36b5f5c830?auto=format&fit=crop&crop=entropy&q=70&w=1200&h=900",
    credit: "Photo by Sarlote Laura Jevdokimova on Unsplash",
    creditHref: "https://unsplash.com/@laurlota",
    date: "28 July 2026 · Row houses",
    title: "First row house families move into the pine forest neighbourhood",
  },
  {
    id: "news-3",
    image:
      "https://images.unsplash.com/photo-1768638687896-35bde623d532?auto=format&fit=crop&crop=top&q=70&w=1200&h=900",
    credit: "Photo by Maximilian Bungart on Unsplash",
    creditHref: "https://unsplash.com/@hypernature",
    date: "6 July 2026 · Technology",
    title: "Smart home access by fingerprint recognition in every apartment",
  },
];

export const SOCIAL_IMAGES = [
  {
    id: "social-1",
    image:
      "https://images.unsplash.com/photo-1757970326337-95d7cca56fa1?auto=format&fit=crop&crop=entropy&q=70&w=600&h=600",
    credit: "Photo by Sebastian Schuster on Unsplash",
    creditHref: "https://unsplash.com/@sschusterphotoart",
  },
  {
    id: "social-2",
    image:
      "https://images.unsplash.com/photo-1759845565036-cbecbcfcb8e2?auto=format&fit=crop&crop=entropy&q=70&w=600&h=600",
    credit: "Photo by Joachim Lesne on Unsplash",
    creditHref: "https://unsplash.com/@joaching",
  },
  {
    id: "social-3",
    image:
      "https://images.unsplash.com/photo-1743878206228-5f36b5f5c830?auto=format&fit=crop&crop=top&q=70&w=600&h=600",
    credit: "Photo by Sarlote Laura Jevdokimova on Unsplash",
    creditHref: "https://unsplash.com/@laurlota",
  },
  {
    id: "social-4",
    image:
      "https://images.unsplash.com/photo-1757372429876-ebeda13edfab?auto=format&fit=crop&crop=right&q=70&w=600&h=600",
    credit: "Photo by Sebastian Schuster on Unsplash",
    creditHref: "https://unsplash.com/@sschusterphotoart",
  },
];

export const BANKS = [
  { name: "Swedbank", href: "https://www.swedbank.lv/private/credit/loans/home" },
  {
    name: "Bigbank",
    href: "https://www.bigbank.lv/privatpersonam/hipotekarais-aizdevums/",
  },
  { name: "Altum", href: "https://www.altum.lv/en/services/individuals/" },
  { name: "Citadele", href: "https://www.citadele.lv/lv/private/mortgage/" },
  {
    name: "SEB",
    href: "https://www.seb.lv/privatpersonam/krediti/majokla-kredits",
  },
  { name: "Luminor", href: "https://www.luminor.lv/en" },
];

export type Building = {
  id: string;
  name: string;
  floors: number;
  x: number;
  z: number;
  rot: number;
};

export const BUILDINGS: Building[] = [
  { id: "A", name: "Building A", floors: 4, x: -16, z: 6, rot: 0.5 },
  { id: "B", name: "Building B", floors: 5, x: 0, z: -7, rot: 0 },
  { id: "C", name: "Building C", floors: 4, x: 16, z: 6, rot: -0.5 },
];

export type Unit = {
  id: string;
  building: string;
  floor: number;
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

export function buildUnits(): Unit[] {
  const units: Unit[] = [];
  let k = 0;
  for (const b of BUILDINGS) {
    for (let f = 1; f <= b.floors; f++) {
      for (let u = 1; u <= 3; u++) {
        const rooms = u === 1 ? 2 : u === 2 ? 3 : 4;
        const area = 48 + u * 17 + f * 2;
        units.push({
          id: `${b.id}-${f}-${u}`,
          building: b.id,
          floor: f,
          name: `Apartment ${b.id}${f}0${u}`,
          rooms,
          area,
          price: 129000 + Math.round(area * 1650 + f * 4200),
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
