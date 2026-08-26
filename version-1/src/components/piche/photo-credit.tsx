export function PhotoCredit({
  credit,
  href,
}: {
  credit: string;
  href?: string;
}) {
  const className =
    "absolute bottom-1.5 left-1.5 z-10 rounded-md bg-black/55 px-1.5 py-1 text-[10px] leading-tight text-white no-underline";

  if (!href) {
    return <span className={className}>{credit}</span>;
  }

  return (
    <a
      href={`${href}?utm_source=piche&utm_medium=referral`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} hover:underline`}
    >
      {credit}
    </a>
  );
}
