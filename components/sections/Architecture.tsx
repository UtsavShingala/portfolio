import { Section } from "@/components/ui/Section";
import { SystemCard } from "@/components/ui/SystemCard";
import { ARCHITECTURE_FOOTNOTE } from "@/content/architecture";
import { PUBLISHED } from "@/content/published";

export function Architecture() {
  return (
    <Section id="architecture">
      {/* items-start so an expanded card doesn't stretch its neighbour. */}
      <div className="grid items-start gap-5 md:grid-cols-2">
        {PUBLISHED.patterns.map((pattern) => (
          <SystemCard key={pattern.slug} pattern={pattern} />
        ))}
      </div>

      <p className="mt-10 text-sm text-muted">{ARCHITECTURE_FOOTNOTE}</p>
    </Section>
  );
}
