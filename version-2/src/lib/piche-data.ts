// Content lifted verbatim from the design file
// ("PICHE home page design/PICHE Home.dc.html").

export type Photo = {
  src: string;
  credit: string;
  creditHref: string;
};

export const PHOTOS = {
  facadeDark: {
    src: "https://images.unsplash.com/photo-1755103114153-eb0a66e3725a?fm=jpg&q=70&w=2000&auto=format&fit=crop",
    credit: "Photo by Haberdoedas on Unsplash",
    creditHref: "https://unsplash.com/@haberdoedas",
  },
  balconies: {
    src: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?fm=jpg&q=70&w=1400&auto=format&fit=crop",
    credit: "Photo by Naksha Banwao on Unsplash",
    creditHref: "https://unsplash.com/@nakshabanwao",
  },
  facadeA: {
    src: "https://images.unsplash.com/photo-1757970326337-95d7cca56fa1?fm=jpg&q=70&w=1400&auto=format&fit=crop",
    credit: "Photo by Sebastian Schuster on Unsplash",
    creditHref: "https://unsplash.com/@sschusterphotoart",
  },
  facadeB: {
    src: "https://images.unsplash.com/photo-1757372429876-ebeda13edfab?fm=jpg&q=70&w=1400&auto=format&fit=crop",
    credit: "Photo by Sebastian Schuster on Unsplash",
    creditHref: "https://unsplash.com/@sschusterphotoart",
  },
  facadeC: {
    src: "https://images.unsplash.com/photo-1757372429884-92e02350c5d9?fm=jpg&q=70&w=1400&auto=format&fit=crop",
    credit: "Photo by Sebastian Schuster on Unsplash",
    creditHref: "https://unsplash.com/@sschusterphotoart",
  },
  livingWide: {
    src: "https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?fm=jpg&q=70&w=1400&auto=format&fit=crop",
    credit: "Photo by Lumbardh Plluzhina on Unsplash",
    creditHref: "https://unsplash.com/@bardhplluzhina",
  },
  livingTv: {
    src: "https://images.unsplash.com/photo-1628592102751-ba83b0314276?fm=jpg&q=70&w=1400&auto=format&fit=crop",
    credit: "Photo by Huy Nguyen on Unsplash",
    creditHref: "https://unsplash.com/@huynguyen_pch",
  },
  kitchen: {
    src: "https://images.unsplash.com/photo-1680416124510-5eae1beca412?fm=jpg&q=70&w=1400&auto=format&fit=crop",
    credit: "Photo by Christian on Unsplash",
    creditHref: "https://unsplash.com/@axcreativeagency",
  },
  couch: {
    src: "https://images.unsplash.com/photo-1666282167632-c613fbeb163c?fm=jpg&q=70&w=1400&auto=format&fit=crop",
    credit: "Photo by Lotus Design N Print on Unsplash",
    creditHref: "https://unsplash.com/@lotusdnp",
  },
  bedroom: {
    src: "https://images.unsplash.com/photo-1662454419716-c4c504728811?fm=jpg&q=70&w=1400&auto=format&fit=crop",
    credit: "Photo by mahmoud azmy on Unsplash",
    creditHref: "https://unsplash.com/@mahmoud_azmy",
  },
  lounge: {
    src: "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?fm=jpg&q=70&w=1400&auto=format&fit=crop",
    credit: "Photo by Prydumano Design on Unsplash",
    creditHref: "https://unsplash.com/@prydumanodesign",
  },
} satisfies Record<string, Photo>;

export const PROJECTS = [
  {
    name: "Priežu Rezidences row houses",
    location: "MĀRUPE",
    status: "Selling",
    photo: PHOTOS.balconies,
  },
  {
    name: "Priežu Rezidences apartments",
    location: "MĀRUPE",
    status: "Selling",
    photo: PHOTOS.facadeA,
  },
  {
    name: "Mežaparka rezidences",
    location: "RĪGA",
    status: "In development",
    photo: PHOTOS.facadeB,
  },
  {
    name: "Krūmiņsala 29",
    location: "RĪGA",
    status: "In development",
    photo: PHOTOS.facadeC,
  },
];

export const NEWS = [
  {
    date: "12 August 2026",
    title: "Priežu Rezidences apartments: construction reaches the final stage",
    photo: PHOTOS.livingTv,
  },
  {
    date: "4 July 2026",
    title: "Row houses in a pine forest — first residents move in",
    photo: PHOTOS.kitchen,
  },
  {
    date: "19 June 2026",
    title: "Smart access and underfloor heating as a standard",
    photo: PHOTOS.couch,
  },
];

export const SOCIAL = [
  { label: "Instagram post", photo: PHOTOS.bedroom },
  { label: "Instagram post", photo: PHOTOS.lounge },
  { label: "Facebook post", photo: PHOTOS.livingWide },
  { label: "Instagram post", photo: PHOTOS.livingTv },
];

export const BANKS = [
  { name: "Swedbank", href: "https://www.swedbank.lv/private/credit/loans/home" },
  {
    name: "Bigbank",
    href: "https://www.bigbank.lv/privatpersonam/hipotekarais-aizdevums/",
  },
  { name: "ALTUM", href: "https://www.altum.lv/en/services/individuals/" },
  { name: "Citadele", href: "https://www.citadele.lv/lv/private/mortgage/" },
  { name: "SEB", href: "https://www.seb.lv/privatpersonam/krediti/majokla-kredits" },
  { name: "Luminor", href: "https://www.luminor.lv/en" },
];

export const LANGUAGES = [
  { code: "LV", label: "Latviešu" },
  { code: "EN", label: "English" },
  { code: "RU", label: "Русский" },
];
