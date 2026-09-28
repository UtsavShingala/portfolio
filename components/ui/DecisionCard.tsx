import Link from "next/link";
import type { ProductDecision } from "@/content/types";

/**
 * Card for a product decision. Links through to its own page rather than
 * expanding: these writeups are meant to grow long, and a long narrative inside
 * a card would have nowhere to go.
 */
export function DecisionCard({ decision }: { decision: ProductDecision }) {
  const href = `/decisions/${decision.slug}`;

  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-muted focus-within:border-muted">
      <h3 className="text-lg leading-tight">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-lg transition-colors group-hover:text-section-accent focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent">
          {decision.title}
        </Link>
      </h3>

      <p className="mt-2.5 leading-relaxed text-muted">{decision.summary}</p>

      <div className="mt-6 border-l-2 border-section-accent pl-4">
        <p className="font-mono text-xs tracking-[0.15em] text-section-accent">
          tradeoff accepted
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {decision.tradeoff}
        </p>
      </div>

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
