import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BulletList } from "@/components/ui/BulletList";
import { Container } from "@/components/ui/Container";
import { DetailSection } from "@/components/ui/DetailSection";
import { MetricGrid } from "@/components/ui/MetricGrid";
import { TagList } from "@/components/ui/Tag";
import { PUBLISHED } from "@/content/published";
import { withoutPlaceholders } from "@/lib/placeholder";
import { ExternalArrowIcon } from "@/components/ui/icons";

/** Every published project is prerendered; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = PUBLISHED.projects.find((p) => p.slug === slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = PUBLISHED.projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const decisions = withoutPlaceholders(project.keyDecisions);

  return (
    <Container className="pt-16 pb-section">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <span aria-hidden="true">←</span> projects
      </Link>

      <h1 className="mt-10 max-w-3xl text-4xl tracking-tight sm:text-5xl">
        {project.title}
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        {project.summary}
      </p>

      <TagList items={project.stack} className="mt-6" />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {project.links.github ? (
          <ExternalButton href={project.links.github}>GitHub</ExternalButton>
        ) : null}
        {project.links.demo ? (
          <ExternalButton href={project.links.demo}>Demo</ExternalButton>
        ) : null}
      </div>

      <MetricGrid metrics={project.metrics} className="mt-14" />

      <DetailSection label="overview" className="mt-16">
        <p className="max-w-3xl leading-relaxed text-muted">
          {project.overview}
        </p>
      </DetailSection>

      {decisions.length > 0 ? (
        <DetailSection label="key decisions">
          <BulletList items={decisions} />
        </DetailSection>
      ) : null}
    </Container>
  );
}

function ExternalButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-text transition-colors hover:border-muted"
    >
      {children}
      <ExternalArrowIcon />
    </a>
  );
}
