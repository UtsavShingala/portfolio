/**
 * Shapes for every content entity on the site.
 *
 * Content files use `satisfies` against these types, so a missing or misspelled
 * field fails the build instead of silently rendering nothing.
 */

/** Hues defined in globals.css, each with a darkened light-mode value. */
export type AccentHue =
  | "green"
  | "blue"
  | "violet"
  | "amber"
  | "cyan"
  | "rose";

export interface Profile {
  id: "github" | "linkedin" | "twitter";
  /** Shown in the card header strip. */
  platform: string;
  handle: string;
  href: string;
  /** One or two lines, as it reads on that platform. */
  bio: string;
  /** Optional third line — location, affiliation, whatever fits the platform. */
  meta?: string;
  /**
   * Path under /public to the photo *that platform actually shows*.
   * Omit it and the card falls back to initials — better a neutral placeholder
   * than another platform's photo, which reads as fake.
   */
  avatar?: string;
  /** Tints this card's header strip. */
  accent?: AccentHue;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  /** Optional generic descriptor. Never a company name. */
  context?: string;
  period: string;
  bullets: string[];
}

/**
 * A live product, as opposed to a project. The distinction is real users: a
 * project shows what you can build, a product shows what you shipped and kept
 * running. They get their own section for that reason.
 */
export interface ShippedProduct {
  /** URL segment: /products/<slug>. */
  slug: string;
  name: string;
  /** The live site, e.g. https://duellia.com */
  url: string;
  /** Bare domain shown on the card. */
  domain: string;
  status: "live" | "in-progress";
  /** One line: what it is and who it's for. */
  summary: string;
  stack: string[];
  github?: string;
  /**
   * Path under /public to a 16:10 screenshot of the live product, e.g.
   * "/products/duellia.png". Shown on the card and the detail page. Omit it
   * and both render without an image.
   */
  screenshot?: string;

  /* ---- detail page ---- */
  /** One string per paragraph. */
  overview: string[];
  keyDecisions: string[];
  metrics?: ProjectMetric[];
}

export interface ProjectLinks {
  github?: string;
  /** Live demo, or a demo video/GIF for backend-only projects. */
  demo?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  /** URL segment: /projects/<slug> */
  slug: string;
  title: string;
  /** One or two lines, shown on the card. */
  summary: string;
  stack: string[];
  links: ProjectLinks;
  /** Controls card order on the home page and the index. Lower renders first. */
  order: number;

  /* ---- detail page ---- */
  overview: string;
  keyDecisions: string[];
  metrics?: ProjectMetric[];
}

export interface ArchitecturePattern {
  /** URL segment: /architecture/<slug>. Keep it short and descriptive. */
  slug: string;
  title: string;
  /** Collapsed state shows only this. */
  summary: string;
  /** Mono one-liner: "Webhook -> HMAC verify -> Queue -> Store" */
  flow?: string;
  description: string;
  decisions: string[];
  /** Path under /public/diagrams. Omit to render the dashed placeholder slot. */
  diagram?: string;
}

/** A headed block of prose in a long-form writeup. */
export interface DetailSection {
  heading: string;
  /** One string per paragraph. */
  body: string[];
}

export interface ProductDecision {
  /** URL segment: /product/<slug>. Keep it short and descriptive. */
  slug: string;
  title: string;
  /** Shown on the card. */
  summary: string;

  /* The four fields — the at-a-glance summary at the top of the page. */
  problem: string;
  options: string;
  choice: string;
  tradeoff: string;

  /**
   * The long-form writeup below the four fields. Optional: a decision can ship
   * as just the summary and grow a full narrative later.
   */
  detail?: DetailSection[];
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  status: "published" | "coming-soon";
  /** ISO date. Only meaningful once status is "published". */
  date?: string;
}

export interface Achievement {
  label: string;
  /** Right-aligned mono value — "Finalist", "416 / 600". */
  value: string;
  /**
   * Optional link to somewhere the result can be checked — a leaderboard, a
   * profile, a results page. Worth more than a certificate image: a reader can
   * verify it in one click.
   */
  href?: string;
}

export interface LeadershipEntry {
  id: string;
  role: string;
  org: string;
  period: string;
  /** One line per point, rendered as a bulleted list. */
  points: string[];
}
