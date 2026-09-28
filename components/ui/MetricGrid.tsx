import type { ProjectMetric } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Column count follows the number of metrics. A fixed two-column grid left an
 * empty grey cell whenever the count was odd — the hairline gaps are painted by
 * the grid's background, so a missing cell shows as a solid block.
 *
 * Class names are spelled out in full so Tailwind can see them.
 */
const COLUMNS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  6: "sm:grid-cols-3",
};

export function MetricGrid({
  metrics,
  className,
}: {
  metrics?: readonly ProjectMetric[];
  className?: string;
}) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-lg border border-border bg-border",
        COLUMNS[metrics.length] ?? "sm:grid-cols-2",
        className,
      )}
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-card p-6">
          <dt className="font-mono text-xs tracking-[0.15em] text-muted">
            {metric.label}
          </dt>
          <dd className="mt-3 text-2xl tabular-nums">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
