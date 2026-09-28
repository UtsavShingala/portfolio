import Link from "next/link";
import { DiagramSlot } from "./DiagramSlot";
import type { ArchitecturePattern } from "@/content/types";

/**
 * Diagram, title, one-line summary, then "Read more" through to the pattern's
 * own page.
 *
 * The detail used to expand in place, which capped the diagram at roughly the
 * card's width — too narrow for boxes and arrows to stay legible. On its own
 * page the diagram gets the full container. No client JS here as a result.
 */
export function SystemCard({ pattern }: { pattern: ArchitecturePattern }) {
  const href = `/architecture/${pattern.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-muted focus-within:border-muted">
      <DiagramSlot
        src={pattern.diagram}
        alt={pattern.title}
        flow={pattern.flow}
        className="border-b border-border"
      />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg leading-tight">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-lg transition-colors group-hover:text-section-accent focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent">
            {pattern.title}
          </Link>
        </h3>

        <p className="mt-2.5 leading-relaxed text-muted">{pattern.summary}</p>

        <div className="mt-auto pt-6">
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-section-accent"
          >
            Read more
            <span className="transition-transform group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

function ArrowIcon() {
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
