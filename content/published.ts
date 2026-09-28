/**
 * What the site actually shows.
 *
 * The raw content files hold everything, including unfinished [PLACEHOLDER]
 * entries. Pages and routes read from here instead, so an entry appears the
 * moment its real text lands and not before. Sections themselves always stay
 * in the nav — only unfinished entries inside them are held back.
 *
 * An entry counts as published when its headline field is real. Lists inside a
 * published entry (key decisions, bullets) are filtered line by line by the
 * pages that render them.
 */
import { isPlaceholder } from "@/lib/placeholder";
import { ACHIEVEMENTS } from "./achievements";
import { ARCHITECTURE_PATTERNS } from "./architecture";
import { BLOG_POSTS } from "./blogs";
import { EXPERIENCE } from "./experience";
import { LEADERSHIP } from "./leadership";
import { PRODUCT_DECISIONS } from "./product";
import { PRODUCTS } from "./products";
import { PROJECTS } from "./projects";
import {
  SECTIONS,
  type RegisteredSection,
  type SectionId,
} from "./sections";
import type { ProductDecision } from "./types";

export const PUBLISHED = {
  products: PRODUCTS.filter((p) => !isPlaceholder(p.summary)),
  projects: PROJECTS.filter((p) => !isPlaceholder(p.summary)),
  patterns: ARCHITECTURE_PATTERNS.filter((p) => !isPlaceholder(p.title)),
  decisions: PRODUCT_DECISIONS.filter((d) => !isPlaceholder(d.title)),
  posts: BLOG_POSTS.filter((p) => !isPlaceholder(p.title)),
  experience: EXPERIENCE.filter((e) => !isPlaceholder(e.role)),
  achievements: ACHIEVEMENTS.filter((a) => !isPlaceholder(a.label)),
  leadership: LEADERSHIP.filter((l) => !isPlaceholder(l.role)),
};

/**
 * One role's decisions, grouped by `area` in first-seen order — the shape the
 * Experience page lists under each role.
 */
export function decisionsByArea(
  role: string,
): { area: string; decisions: ProductDecision[] }[] {
  const groups = new Map<string, ProductDecision[]>();

  for (const decision of PUBLISHED.decisions) {
    if (decision.role !== role) continue;
    groups.set(decision.area, [...(groups.get(decision.area) ?? []), decision]);
  }

  return [...groups].map(([area, decisions]) => ({ area, decisions }));
}

const ALL_SECTIONS: readonly RegisteredSection[] = SECTIONS;
const NUMBERED = ALL_SECTIONS.filter((s) => s.numbered !== false);

/**
 * Zero-padded position among the numbered sections: "01", "02", ...
 * Returns null for sections outside that run (the blog).
 */
export function sectionNumber(id: SectionId): string | null {
  const index = NUMBERED.findIndex((section) => section.id === id);
  return index === -1 ? null : String(index + 1).padStart(2, "0");
}

/** The shape the client header needs — plain data, no content arrays. */
export interface NavItem {
  id: SectionId;
  label: string;
  href: string;
  accent: string;
  number: string | null;
}

export function navItems(): { main: NavItem[]; extra: NavItem[] } {
  const toItem = (section: RegisteredSection): NavItem => ({
    id: section.id,
    label: section.label,
    href: `/${section.id}`,
    accent: section.accent ?? "green",
    number: sectionNumber(section.id),
  });

  return {
    main: NUMBERED.map(toItem),
    extra: ALL_SECTIONS.filter((s) => s.numbered === false).map(toItem),
  };
}
