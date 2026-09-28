import { BulletList } from "@/components/ui/BulletList";
import { Section } from "@/components/ui/Section";
import { PUBLISHED } from "@/content/published";
import { cn } from "@/lib/utils";

/**
 * Timeline layout: period in a left column, a vertical rail with a dot per
 * role, content to the right.
 *
 * The rail is the content cell's left border rather than a separate absolute
 * element, so it always matches the entry's real height. The last entry drops
 * its border so the line stops at the final dot instead of trailing past it.
 *
 * Below `sm` the grid collapses to one column: the period sits above the role
 * and the rail stays, so it still reads as a timeline on a phone.
 */
export function Experience() {
  return (
    <Section id="experience">
      <ol className="space-y-0">
        {PUBLISHED.experience.map((entry, index) => {
          const isLast = index === PUBLISHED.experience.length - 1;

          return (
            <li
              key={entry.id}
              className="grid gap-x-10 gap-y-3 sm:grid-cols-[11rem_1fr]"
            >
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

                {entry.context ? (
                  <p className="mt-1.5 text-sm text-muted">{entry.context}</p>
                ) : null}

                <BulletList items={entry.bullets} className="mt-6" />
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
