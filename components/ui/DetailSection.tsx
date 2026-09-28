import { cn } from "@/lib/utils";

/**
 * A titled block on a detail page: the mono label in a left column, the content
 * beside it.
 *
 * Stacking the label above a max-width paragraph left the right half of every
 * detail page empty. Moving the label into its own column uses that width, and
 * lines up with the date column on the Experience and Leadership timelines so
 * the whole site shares one grid. Below `lg` the label stacks back on top.
 */
export function DetailSection({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "mt-14 grid gap-5 border-t border-border pt-10 lg:grid-cols-[11rem_1fr] lg:gap-10",
        className,
      )}
    >
      <h2 className="font-mono text-xs tracking-[0.2em] text-muted lg:pt-1">
        {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
