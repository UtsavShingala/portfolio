import { sectionNumber } from "@/content/published";
import type { SectionId } from "@/content/sections";

/**
 * The mono marker above a section heading, in that section's hue.
 *
 * Just the number. It used to read "01 — shipped products", but once labels and
 * headings were renamed to match, that repeated the heading word for word one
 * line above itself.
 *
 * Renders nothing for sections outside the numbered run — the blog has no
 * number to show, and an empty marker line is worse than none.
 */
export function SectionLabel({ id }: { id: SectionId }) {
  const number = sectionNumber(id);

  if (!number) return null;

  return (
    <p className="font-mono text-sm tracking-[0.2em] text-section-accent">
      {number}
    </p>
  );
}
