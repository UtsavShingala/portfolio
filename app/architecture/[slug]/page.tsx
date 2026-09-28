import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BulletList } from "@/components/ui/BulletList";
import { Container } from "@/components/ui/Container";
import { DetailSection } from "@/components/ui/DetailSection";
import { DiagramSlot } from "@/components/ui/DiagramSlot";
import { ARCHITECTURE_FOOTNOTE } from "@/content/architecture";
import { PUBLISHED } from "@/content/published";
import { getSection } from "@/content/sections";

/** Every published pattern is prerendered; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED.patterns.map((pattern) => ({ slug: pattern.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/architecture/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pattern = PUBLISHED.patterns.find((p) => p.slug === slug);

  if (!pattern) return {};

  return {
    title: pattern.title,
    description: pattern.summary,
    openGraph: { title: pattern.title, description: pattern.summary },
  };
}

export default async function PatternPage({
  params,
}: PageProps<"/architecture/[slug]">) {
  const { slug } = await params;
  const pattern = PUBLISHED.patterns.find((p) => p.slug === slug);

  if (!pattern) notFound();

  const section = getSection("architecture");

  return (
    <div data-accent={section.accent ?? "green"} className="relative isolate">
      <div
        aria-hidden="true"
        className="backdrop-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem]"
      />

      <Container className="pt-16 pb-section">
        <Link
          href="/architecture"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-section-accent"
        >
          <span aria-hidden="true">←</span> {section.label.toLowerCase()}
        </Link>

        <h1 className="mt-10 max-w-3xl text-4xl tracking-tight sm:text-5xl">
          {pattern.title}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {pattern.summary}
        </p>

        {/* The reason this page exists: the diagram gets the full container. */}
        <DiagramSlot
          src={pattern.diagram}
          alt={pattern.title}
          flow={pattern.flow}
          size="page"
          priority
          className="mt-12 overflow-hidden rounded-lg border border-border"
        />

        {/* The slot above already draws the flow when there is no diagram;
            with a diagram, the flow line stays as a text summary of it. */}
        {pattern.diagram && pattern.flow ? (
          <div className="mt-8 overflow-x-auto rounded-md border border-border bg-card px-5 py-4">
            <p className="whitespace-nowrap font-mono text-sm text-muted">
              {pattern.flow}
            </p>
          </div>
        ) : null}

        <DetailSection label="how it works">
          <p className="max-w-3xl leading-relaxed text-muted">
            {pattern.description}
          </p>
        </DetailSection>

        <DetailSection label="design decisions">
          <BulletList items={pattern.decisions} />
        </DetailSection>

        <p className="mt-12 text-sm text-muted">{ARCHITECTURE_FOOTNOTE}</p>
      </Container>
    </div>
  );
}
