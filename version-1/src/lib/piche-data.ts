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
      "https://images.unsplash.com/photo-1757970326337-95d7cca56fa1?fm=jpg&q=70&w=900&auto=format&fit=crop",
    credit: "Photo by Sebastian Schuster on Unsplash",
    creditHref: "https://unsplash.com/@sschusterphotoart",
    location: "Mārupe",
    status: "In sales",
    name: "Priežu Rezidences apartments",
    meta: "Mežciema iela, Mārupe · 1–4 bedrooms · from 129 000 €",
  },
  {
    id: "project-2",
    href: "#explore",
    image:
      "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?fm=jpg&q=70&w=900&auto=format&fit=crop",
    credit: "Photo by Naksha Banwao on Unsplash",
    creditHref: "https://unsplash.com/@nakshabanwao",
    location: "Mārupe",
    status: "In sales",
    name: "Priežu Rezidences row houses",
    meta: "Mežciema iela, Mārupe · 4–5 rooms · from 235 000 €",
  },
  {
    id: "project-3",
    href: "#projects",
    image:
      "https://images.unsplash.com/photo-1757372429876-ebeda13edfab?fm=jpg&q=70&w=900&auto=format&fit=crop",
    credit: "Photo by Sebastian Schuster on Unsplash",
    creditHref: "https://unsplash.com/@sschusterphotoart",
    location: "Rīga",
    status: "Coming soon",
    name: "Mežaparka rezidences",
    meta: "Mežaparks, Rīga · apartments · in design",
  },
  {
    id: "project-4",
    href: "#projects",
    image:
      "https://images.unsplash.com/photo-1757372429884-92e02350c5d9?fm=jpg&q=70&w=900&auto=format&fit=crop",
    credit: "Photo by Sebastian Schuster on Unsplash",
    creditHref: "https://unsplash.com/@sschusterphotoart",
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
      "https://images.unsplash.com/photo-1628592102751-ba83b0314276?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    credit: "Photo by Huy Nguyen on Unsplash",
    creditHref: "https://unsplash.com/@huynguyen_pch",
    date: "12 August 2026 · Priežu Rezidences",
    title: "Construction of the apartment building reaches the top floor",
  },
  {
    id: "news-2",
    image:
      "https://images.unsplash.com/photo-1680416124510-5eae1beca412?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    credit: "Photo by Christian on Unsplash",
    creditHref: "https://unsplash.com/@axcreativeagency",
    date: "28 July 2026 · Row houses",
    title: "First row house families move into the pine forest neighbourhood",
  },
  {
    id: "news-3",
    image:
      "https://images.unsplash.com/photo-1666282167632-c613fbeb163c?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    credit: "Photo by Lotus Design N Print on Unsplash",
    creditHref: "https://unsplash.com/@lotusdnp",
    date: "6 July 2026 · Technology",
    title: "Smart home access by fingerprint recognition in every apartment",
  },
];

export const SOCIAL_IMAGES = [
  {
    id: "social-1",
    image:
      "https://images.unsplash.com/photo-1662454419716-c4c504728811?fm=jpg&q=70&w=600&auto=format&fit=crop",
    credit: "Photo by mahmoud azmy on Unsplash",
    creditHref: "https://unsplash.com/@mahmoud_azmy",
  },
  {
    id: "social-2",
    image:
      "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?fm=jpg&q=70&w=600&auto=format&fit=crop",
    credit: "Photo by Prydumano Design on Unsplash",
    creditHref: "https://unsplash.com/@prydumanodesign",
  },
  {
    id: "social-3",
    image:
      "https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?fm=jpg&q=70&w=600&auto=format&fit=crop",
    credit: "Photo by Lumbardh Plluzhina on Unsplash",
    creditHref: "https://unsplash.com/@bardhplluzhina",
  },
  {
    id: "social-4",
    image:
      "https://images.unsplash.com/photo-1628592102751-ba83b0314276?fm=jpg&q=70&w=600&auto=format&fit=crop",
    credit: "Photo by Huy Nguyen on Unsplash",
    creditHref: "https://unsplash.com/@huynguyen_pch",
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
