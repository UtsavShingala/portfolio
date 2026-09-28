/**
 * Tech-stack tags. Always mono, always accent — never sans.
 * One of the four sanctioned accent uses.
 *
 * Each item is its own non-breaking unit with the separator attached to it, so
 * a wrapped line never starts with a stray "·".
 */
export function TagList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <p
      className={`flex flex-wrap gap-x-2.5 gap-y-1 font-mono text-sm text-accent ${className ?? ""}`}
    >
      {items.map((item, index) => (
        <span key={item} className="whitespace-nowrap">
          {item}
          {index < items.length - 1 ? (
            <span aria-hidden="true" className="ml-2.5">
              ·
            </span>
          ) : null}
        </span>
      ))}
    </p>
  );
}
