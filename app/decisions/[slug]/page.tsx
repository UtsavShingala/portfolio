import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PUBLISHED } from "@/content/published";
import { getSection } from "@/content/sections";
import { cn } from "@/lib/utils";

/** Every published decision is prerendered; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED.decisions.map((decision) => ({ slug: decision.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/decisions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const decision = PUBLISHED.decisions.find((d) => d.slug === slug);

  if (!decision) return {};

  return {
    title: decision.title,
    description: decision.summary,
    openGraph: { title: decision.title, description: decision.summary },
  };
}

export default async function DecisionPage({
  params,
}: PageProps<"/decisions/[slug]">) {
  const { slug } = await params;
  const decision = PUBLISHED.decisions.find((d) => d.slug === slug);

  if (!decision) notFound();

  const section = getSection("decisions");

  return (
    <div data-accent={section.accent ?? "green"} className="relative isolate">
      <div
        aria-hidden="true"
        className="backdrop-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem]"
      />

      <Container className="pt-16 pb-section">
        <Link
          href="/decisions"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-section-accent"
        >
          <span aria-hidden="true">←</span> {section.label.toLowerCase()}
        </Link>

        <h1 className="mt-10 max-w-3xl text-4xl tracking-tight sm:text-5xl">
          {decision.title}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {decision.summary}
        </p>

        {/* The four fields stay as the at-a-glance summary; the narrative
            below is where a long writeup lives. */}
        <dl className="mt-14 grid gap-x-12 gap-y-9 border-t border-border pt-10 sm:grid-cols-2">
          <Field label="problem" value={decision.problem} />
          <Field label="options considered" value={decision.options} />
          <Field label="what I chose" value={decision.choice} />
          <Field label="tradeoff accepted" value={decision.tradeoff} emphasis />
        </dl>

        {decision.detail?.map((part) => (
          <section
            key={part.heading}
            className="mt-12 border-t border-border pt-10"
          >
            <h2 className="text-2xl tracking-tight">{part.heading}</h2>
            <div className="mt-5 max-w-3xl space-y-4">
              {part.body.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </div>
  );
}

function Field({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className={cn(emphasis && "border-l-2 border-section-accent pl-5")}>
      <dt
        className={cn(
          "font-mono text-xs tracking-[0.15em]",
          emphasis ? "text-section-accent" : "text-muted",
        )}
      >
        {label}
      </dt>
      <dd className="mt-3 leading-relaxed text-muted">{value}</dd>
    </div>
  );
}
