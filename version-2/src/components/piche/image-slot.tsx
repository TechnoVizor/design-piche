import Image from "next/image";
import type { Photo } from "@/lib/piche-data";

// Stands in for the design file's <image-slot> element: a photograph filling
// its (relatively positioned) container, object-fit cover.
export function ImageSlot({
  photo,
  alt,
  sizes,
  priority = false,
}: {
  photo: Photo;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={photo.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover transition-transform duration-700 ease-(--ease-link) group-hover:scale-105"
    />
  );
}

// Small darkened chip in a photo corner (project / news / social cards).
export function CreditChip({ photo }: { photo: Photo }) {
  return (
    <div className="type-credit absolute right-2 bottom-2 z-2 rounded-[4px] bg-black/45 px-1.5 py-[3px] text-white/92">
      {photo.credit}
    </div>
  );
}

// Linked "Photo by X on Unsplash" line used on the hero and about photos.
export function PhotoCredit({ photo }: { photo: Photo }) {
  const name = photo.credit.replace(/^Photo by /, "").replace(/ on Unsplash$/, "");
  return (
    <div className="type-credit absolute right-2 bottom-2 z-2 flex gap-1 text-white/72 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
      <span>Photo by</span>
      <a
        href={photo.creditHref}
        target="_blank"
        rel="noopener"
        className="text-white/92 hover:text-white"
      >
        {name}
      </a>
      <span>on</span>
      <a
        href="https://unsplash.com/?utm_source=piche&utm_medium=referral"
        target="_blank"
        rel="noopener"
        className="text-white/92 hover:text-white"
      >
        Unsplash
      </a>
    </div>
  );
}
