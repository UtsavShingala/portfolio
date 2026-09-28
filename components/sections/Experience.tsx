import Link from "next/link";
import { BulletList } from "@/components/ui/BulletList";
import { Section } from "@/components/ui/Section";
import { PUBLISHED, decisionsByArea } from "@/content/published";

/**
 * One column per role, read top to bottom like a résumé: role and period on
 * one line, then context, bullets and decisions. Entries use the container's
 * full width, so the period sits at the right edge the text runs to.
 *
 * Roles stack with a hairline between them. With a single role there is no
 * timeline to draw, so the old left date column and rail are gone.
 *
 * Product decisions made in a role are listed under it rather than in a
 * section of their own — they came from that job, and reading them beside it
 * is what gives them context. Each row links to the decision's full page.
 */
export function Experience() {
  return (
    <Section id="experience">
      <ol className="divide-y divide-border">
        {PUBLISHED.experience.map((entry) => {
          const decisionGroups = decisionsByArea(entry.id);

          return (
            <li key={entry.id} className="py-14 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-xl leading-tight">{entry.role}</h3>
                <p className="whitespace-nowrap font-mono text-sm text-muted">
                  {entry.period}
                </p>
              </div>

              {entry.context ? (
                <p className="mt-1.5 text-sm text-muted">{entry.context}</p>
              ) : null}

              <BulletList items={entry.bullets} className="mt-6" fullWidth />

              {decisionGroups.length > 0 ? (
                <div
                  id={`${entry.id}-decisions`}
                  className="mt-12 scroll-mt-24 border-t border-border pt-8"
                >
                  <h4 className="font-mono text-xs tracking-[0.2em] text-muted">
                    product decisions
                  </h4>
                  <p className="mt-2 text-sm text-muted">
                    The problem, the options, what I chose, and what it cost.
                  </p>

                  <div className="mt-8 space-y-8">
                    {decisionGroups.map(({ area, decisions }) => (
                      <div
                        key={area}
                        className="grid gap-3 md:grid-cols-[7.5rem_1fr] md:gap-6"
                      >
                        <p className="font-mono text-xs text-muted md:pt-[1.1rem]">
                          {area}
                        </p>

                        <ul
                          aria-label={`${area} decisions`}
                          className="border-t border-border"
                        >
                          {decisions.map((decision) => (
                            <li
                              key={decision.slug}
                              className="border-b border-border"
                            >
                              <Link
                                href={`/decisions/${decision.slug}`}
                                className="group flex items-baseline justify-between gap-6 py-3.5"
                              >
                                <span className="transition-colors group-hover:text-section-accent">
                                  {decision.title}
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
                                >
                                  →
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
