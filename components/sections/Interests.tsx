import { Container } from "@/components/ui/Container";
import { INTERESTS } from "@/content/interests";
import type { AccentHue } from "@/content/types";

/**
 * Personality signals on the cover page. Unnumbered and not a nav target —
 * these are a tie-breaker for a reader who already likes the work, not a
 * section that competes with it.
 *
 * Each interest is a tile with its own glyph and hue, so the row reads as a
 * small picture of the person rather than a line of grey pills that was easy
 * to scroll straight past. The label sits in the left column of the same grid
 * the detail pages and timelines use.
 *
 * Glyphs are matched from the interest's text, so the content file stays a
 * plain list of words. Anything unmatched gets a neutral spark rather than a
 * wrong picture.
 */
export function Interests() {
  if (INTERESTS.length === 0) return null;

  return (
    <section className="border-t border-border">
      <Container className="py-16">
        <div className="grid gap-6 lg:grid-cols-[11rem_1fr] lg:gap-10">
          <p className="font-mono text-xs tracking-[0.2em] text-muted lg:pt-5">
            outside work
          </p>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {INTERESTS.map((interest) => {
              const { Icon, hue } = styleFor(interest);

              return (
                <li
                  key={interest}
                  data-accent={hue}
                  className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-section-accent/10 text-section-accent"
                  >
                    <Icon />
                  </span>
                  <span className="text-sm leading-snug text-text">
                    {interest}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

type Glyph = () => React.ReactNode;

const STYLES: { match: RegExp; Icon: Glyph; hue: AccentHue }[] = [
  { match: /music|sing|vocal/i, Icon: MusicIcon, hue: "violet" },
  { match: /sport|cricket|football|badminton/i, Icon: SportsIcon, hue: "amber" },
  { match: /space|astro|star/i, Icon: SpaceIcon, hue: "cyan" },
  { match: /travel/i, Icon: TravelIcon, hue: "blue" },
  { match: /adventure|trek|hik|mountain/i, Icon: AdventureIcon, hue: "rose" },
];

function styleFor(interest: string): { Icon: Glyph; hue: AccentHue } {
  return (
    STYLES.find((style) => style.match.test(interest)) ?? {
      Icon: SparkIcon,
      hue: "blue",
    }
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

function MusicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18V5l12-2v13" {...stroke} />
      <circle cx="6" cy="18" r="3" {...stroke} />
      <circle cx="18" cy="16" r="3" {...stroke} />
    </svg>
  );
}

function SportsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M5.6 5.6a9 9 0 0 1 0 12.8M18.4 5.6a9 9 0 0 0 0 12.8" {...stroke} />
    </svg>
  );
}

function SpaceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" {...stroke} />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-20 12 12)" {...stroke} />
    </svg>
  );
}

function TravelIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5 21 3Z" {...stroke} />
    </svg>
  );
}

function AdventureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 20 6-11 4 6 2.5-4L21 20H3Z" {...stroke} />
      <path d="m7.5 11.8 1.5 1.2 1.5-1.4" {...stroke} />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" {...stroke} />
    </svg>
  );
}
