/**
 * SECTION REGISTRY — the single source of truth for the whole page.
 *
 * Each section is its own page. This one array drives three things at once:
 *   1. the nav items in the header (and mobile menu)
 *   2. the static routes generated at /[section]
 *   3. the "01" numbering, derived from position among visible sections
 *
 * To add a section: add an entry here and map its component in
 * `app/[section]/page.tsx`. The route, the nav item and the numbering all
 * follow automatically — there is no route file to create.
 *
 * The hero and the closing CTA are deliberately absent: they are unnumbered
 * and are not nav targets.
 */
import type { AccentHue } from "./types";

export interface SectionDefinition {
  /** URL segment (/skills), and the lowercase word after the number. */
  id: string;
  /** Nav label. */
  label: string;
  /** Heading rendered at the top of the page. */
  heading: string;
  /** Optional paragraph under the heading. */
  intro?: string;
  /** Overrides `intro` for <meta description>. Keep under ~160 characters. */
  description?: string;
  /**
   * Hue for this section's number and backdrop glow. Defined in globals.css
   * with a darkened light-mode value for each. Defaults to green.
   */
  accent?: AccentHue;
  /**
   * Defaults to true. A section with `numbered: false` sits outside the
   * numbered run — it keeps its page and nav item but gets no "01 —" marker,
   * doesn't consume a number, and is separated in the nav. The blog uses this:
   * it isn't a portfolio section, it's a different kind of thing.
   */
  numbered?: boolean;
}

export const SECTIONS = [
  {
    id: "products",
    label: "Shipped products",
    heading: "Shipped products",
    accent: "cyan",
    intro:
      "Products I've built end to end and run in production — live, public, and maintained.",
  },
  {
    id: "experience",
    label: "Experience",
    heading: "Experience",
    accent: "blue",
  },
  {
    id: "projects",
    label: "Projects",
    heading: "Projects",
    accent: "green",
    intro:
      "Systems built to go deep on one hard problem each — matching, agent routing, extraction, retrieval. Open one for the design decisions behind it.",
  },
  {
    id: "architecture",
    label: "System architectures",
    heading: "System architectures",
    accent: "violet",
    intro:
      "General patterns from production work: the shape of each system, and the decisions that made it hold up.",
  },
  // Product decisions have no section of their own: each is listed under the
  // role it was made in, on the Experience page (see content/product.ts).
  {
    id: "achievements",
    label: "Achievements",
    heading: "Achievements",
    accent: "rose",
  },
  {
    id: "leadership",
    label: "Leadership",
    heading: "Leadership",
    accent: "amber",
  },
  {
    id: "blogs",
    label: "Blog",
    heading: "Blog",
    accent: "violet",
    numbered: false,
  },
] as const satisfies readonly SectionDefinition[];

/** Union of every registered section id — "experience" | "projects" | ... */
export type SectionId = (typeof SECTIONS)[number]["id"];

/**
 * A registered section as the rest of the app sees it: `id` keeps its literal
 * type, and the optional fields stay visible.
 *
 * `as const` narrows each entry to exactly the keys it declares, so reading
 * `.numbered` straight off SECTIONS fails on the entries that omit it. Viewing
 * the array through this type restores the full shape.
 */
export interface RegisteredSection extends SectionDefinition {
  id: SectionId;
}

const ALL_SECTIONS: readonly RegisteredSection[] = SECTIONS;

// Nav order, visibility and numbering live in content/published.ts: a section
// with nothing published has no page, so it must not take a number either.

export function getSection(id: SectionId): RegisteredSection {
  const section = ALL_SECTIONS.find((entry) => entry.id === id);
  if (!section) {
    throw new Error(`Unknown section id: ${id}`);
  }
  return section;
}

/** Each section is its own page. */
export function sectionHref(id: string): string {
  return `/${id}`;
}

export function isSectionId(value: string): value is SectionId {
  return SECTIONS.some((section) => section.id === value);
}

