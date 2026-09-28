import { BulletList } from "@/components/ui/BulletList";
import { Section } from "@/components/ui/Section";
import { LEADERSHIP } from "@/content/leadership";
import { withoutPlaceholders } from "@/lib/placeholder";
import { cn } from "@/lib/utils";

/**
 * Same timeline as Experience — both sections are chronological, so they should
 * read the same way. See Experience for why the rail is a border rather than an
 * absolute element.
 */
export function Leadership() {
  return (
    <Section id="leadership">
      <ol>
        {LEADERSHIP.map((entry, index) => {
          const isLast = index === LEADERSHIP.length - 1;
          const points = withoutPlaceholders(entry.points);

          return (
            <li
              key={entry.id}
              className="grid gap-x-10 gap-y-3 sm:grid-cols-[11rem_1fr]"
            >
              {/* nowrap + an 11rem column keeps "Nov 2024 — Jun 2025" on one line. */}
              <p className="whitespace-nowrap font-mono text-sm text-muted sm:pt-1 sm:text-right">
                {entry.period}
              </p>

              <div
                className={cn(
                  "relative border-l pl-8",
                  isLast ? "border-transparent pb-0" : "border-border pb-14",
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-section-accent ring-4 ring-bg"
                />

                <h3 className="text-xl leading-tight">{entry.role}</h3>
                <p className="mt-1.5 text-sm text-muted">{entry.org}</p>

                <BulletList items={points} className="mt-5" />
              </div>
            </li>
          );
        })}
      </ol>

    </Section>
  );
}
