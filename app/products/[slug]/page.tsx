import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BulletList } from "@/components/ui/BulletList";
import { Container } from "@/components/ui/Container";
import { DetailSection } from "@/components/ui/DetailSection";
import { MetricGrid } from "@/components/ui/MetricGrid";
import { TagList } from "@/components/ui/Tag";
import { PUBLISHED } from "@/content/published";
import { withoutPlaceholders } from "@/lib/placeholder";
import { getSection } from "@/content/sections";

/** Every published product is prerendered; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED.products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = PUBLISHED.products.find((p) => p.slug === slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.summary,
    openGraph: { title: product.name, description: product.summary },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = PUBLISHED.products.find((p) => p.slug === slug);

  if (!product) notFound();

  const section = getSection("products");
  const decisions = withoutPlaceholders(product.keyDecisions);

  return (
    <div data-accent={section.accent ?? "green"} className="relative isolate">
      <div
        aria-hidden="true"
        className="backdrop-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem]"
      />

      <Container className="pt-16 pb-section">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-section-accent"
        >
          <span aria-hidden="true">←</span> {section.label.toLowerCase()}
        </Link>

        <h1 className="mt-10 text-4xl tracking-tight sm:text-5xl">
          {product.name}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {product.summary}
        </p>

        <TagList items={product.stack} className="mt-6" />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md border border-section-accent/40 bg-section-accent/10 px-4 py-2.5 text-sm text-section-accent transition-opacity hover:opacity-80"
          >
            Visit {product.domain}
            <ArrowIcon />
          </a>

          {product.github ? (
            <a
              href={product.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-text transition-colors hover:border-muted"
            >
              GitHub
              <ArrowIcon />
            </a>
          ) : null}
        </div>

        {product.screenshot ? (
          <div className="relative mt-14 aspect-[16/10] overflow-hidden rounded-lg border border-border bg-card">
            <Image
              src={product.screenshot}
              alt={`${product.name} — the live product`}
              fill
              priority
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="object-cover object-top"
            />
          </div>
        ) : null}

        <MetricGrid metrics={product.metrics} className="mt-14" />

        <DetailSection label="overview" className="mt-16">
          <div className="flex max-w-3xl flex-col gap-4">
            {product.overview.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </DetailSection>

        {decisions.length > 0 ? (
          <DetailSection label="key decisions">
            <BulletList items={decisions} />
          </DetailSection>
        ) : null}
      </Container>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
