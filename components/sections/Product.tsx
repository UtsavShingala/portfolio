import { Section } from "@/components/ui/Section";
import { DecisionCard } from "@/components/ui/DecisionCard";
import { PUBLISHED } from "@/content/published";

export function Product() {
  return (
    <Section id="decisions">
      {PUBLISHED.decisions.length === 0 ? (
        <p className="border-t border-border pt-8 font-mono text-sm text-muted">
          First entries coming soon.
        </p>
      ) : null}
      <div className="grid items-start gap-5 md:grid-cols-2">
        {PUBLISHED.decisions.map((decision) => (
          <DecisionCard key={decision.slug} decision={decision} />
        ))}
      </div>
    </Section>
  );
}
