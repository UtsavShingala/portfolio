import Link from "next/link";
import { TagList } from "@/components/ui/Tag";
import type { Project } from "@/content/types";

export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-muted focus-within:border-muted">
      <h3 className="text-xl">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-lg transition-colors group-hover:text-accent focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent">
          {project.title}
        </Link>
      </h3>

      <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

      <TagList items={project.stack} className="mt-5" />

      <div className="mt-auto flex items-center justify-between gap-4 pt-8">
        <div className="flex items-center gap-5">
          {project.links.github ? (
            <CardLink href={project.links.github} external>
              GitHub
            </CardLink>
          ) : null}
          {project.links.demo ? (
            <CardLink href={project.links.demo} external>
              Demo
            </CardLink>
          ) : null}
        </div>

        <span
          aria-hidden="true"
          className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-accent"
        >
          Read more
          <span className="transition-transform group-hover:translate-x-0.5">
            <NextIcon />
          </span>
        </span>
      </div>
    </article>
  );
}

function NextIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="relative z-10 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
