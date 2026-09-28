import { Section } from "@/components/ui/Section";
import { ACHIEVEMENTS } from "@/content/achievements";

/**
 * One per row. At full width the label sits left and the result sits right,
 * with the hairline carrying the eye across.
 *
 * Rows with an `href` become verifiable — the whole row links out to the
 * leaderboard or profile that proves the number.
 */
export function Achievements() {
  return (
    <Section id="achievements">
      <dl className="border-t border-border">
        {ACHIEVEMENTS.map((achievement) => {
          // "iRage AlgoArena 2026 · quant finance & trading challenge": the
          // part after " · " is context, so it steps down to a muted subtitle.
          const [name, ...rest] = achievement.label.split(" · ");
          const context = rest.join(" · ");

          const row = (
            <>
              <dt className="min-w-0 transition-colors">
                {name}
                {context ? (
                  <span className="mt-1 block text-sm text-muted sm:ml-3 sm:mt-0 sm:inline">
                    {context}
                  </span>
                ) : null}
              </dt>
              <dd className="flex shrink-0 items-center gap-2 font-mono text-sm text-text tabular-nums">
                {achievement.value}
                {achievement.href ? <ArrowIcon /> : null}
              </dd>
            </>
          );

          if (achievement.href) {
            return (
              <a
                key={achievement.label}
                href={achievement.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-baseline justify-between gap-8 border-b border-border py-6 transition-colors hover:text-section-accent"
              >
                {row}
              </a>
            );
          }

          return (
            <div
              key={achievement.label}
              className="flex items-baseline justify-between gap-8 border-b border-border py-6"
            >
              {row}
            </div>
          );
        })}
      </dl>
    </Section>
  );
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
