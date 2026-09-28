import Link from "next/link";
import { TagList } from "@/components/ui/Tag";
import type { ShippedProduct } from "@/content/types";

/**
 * The live domain is the headline here, not a footnote — a working URL is the
 * whole reason these sit apart from projects.
 *
 * The whole card is clickable: the title link stretches over it with ::after.
 * The domain link sits above that layer (relative z-10) so it still opens the
 * live site. "Read more" is a visual cue, not a second link to the same page.
 */
export function ProductCard({ product }: { product: ShippedProduct }) {
  const href = `/products/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-muted focus-within:border-muted">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl leading-tight">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-lg transition-colors group-hover:text-section-accent focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent">
            {product.name}
          </Link>
        </h3>

        <StatusBadge status={product.status} />
      </div>

      <a
        href={product.url}
        target="_blank"
        rel="noreferrer noopener"
        className="relative z-10 mt-2 inline-flex w-fit items-center gap-1.5 font-mono text-sm text-section-accent transition-opacity hover:opacity-75"
      >
        {product.domain}
        <ArrowIcon />
      </a>

      <p className="mt-4 leading-relaxed text-muted">{product.summary}</p>

      <TagList items={product.stack} className="mt-5" />

      <div className="mt-auto pt-6">
        <span
          aria-hidden="true"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-section-accent"
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

function StatusBadge({ status }: { status: ShippedProduct["status"] }) {
  const live = status === "live";

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted">
      <span
        aria-hidden="true"
        className={
          live
            ? "h-1.5 w-1.5 rounded-full bg-section-accent"
            : "h-1.5 w-1.5 rounded-full bg-muted"
        }
      />
      {live ? "live" : "in progress"}
    </span>
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
