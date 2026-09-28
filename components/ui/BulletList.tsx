import { cn } from "@/lib/utils";

/**
 * The one bullet style on the site — a solid round dot, used by every list of
 * points (experience, leadership, key decisions, design decisions) so they all
 * read as the same kind of thing.
 *
 * The dot is a fixed element rather than list-style so it stays aligned with
 * the first line of a wrapped item.
 */
export function BulletList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("max-w-3xl space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3.5 leading-relaxed text-muted">
          <span
            aria-hidden="true"
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
