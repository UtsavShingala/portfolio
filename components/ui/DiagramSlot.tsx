import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * 16:9 diagram slot, shared by the system cards and their detail pages.
 *
 * With a diagram file it shows the image. Without one it draws the pattern's
 * `flow` as a row of steps, so the slot carries real information instead of a
 * "coming soon" box — five of those in a grid made the page read as unfinished.
 * Only a pattern with neither falls back to the placeholder.
 */
export function DiagramSlot({
  src,
  alt,
  flow,
  size = "card",
  className,
  priority,
}: {
  src?: string;
  alt: string;
  /** "Webhook -> HMAC verify -> Queue" */
  flow?: string;
  size?: "card" | "page";
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={cn("relative aspect-video w-full bg-bg", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-contain"
        />
      </div>
    );
  }

  const steps = flow
    ?.split("->")
    .map((step) => step.trim())
    .filter(Boolean);

  if (steps && steps.length > 0) {
    return (
      <div
        role="img"
        aria-label={`${alt}: ${steps.join(", then ")}`}
        className={cn(
          // Natural height on phones, where a fixed 16:9 box would clip a long
          // flow; 16:9 from sm up so cards in a row line up.
          "flex w-full items-center justify-center bg-bg sm:aspect-video",
          // Faint dot grid: reads as a drawing surface, and uses the hairline
          // token so it follows the theme.
          "bg-[radial-gradient(var(--line)_1px,transparent_1px)] bg-[size:14px_14px]",
          size === "page" ? "p-8 sm:p-12" : "p-6",
          className,
        )}
      >
        <ol
          className={cn(
            "flex flex-wrap items-center justify-center",
            size === "page" ? "max-w-3xl gap-x-3 gap-y-4" : "gap-x-2 gap-y-3",
          )}
        >
          {steps.map((step, index) => (
            // The arrow leads into its step rather than trailing the previous
            // one, so a wrapped line starts "→ Queue" instead of ending on a
            // lone arrow.
            <li key={step} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-section-accent">
                  →
                </span>
              ) : null}
              <span
                className={cn(
                  "rounded-md border border-border bg-card font-mono text-text",
                  size === "page" ? "px-4 py-2.5 text-sm" : "px-2.5 py-1.5 text-xs",
                )}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex aspect-video w-full items-center justify-center bg-bg",
        className,
      )}
    >
      <p className="font-mono text-sm text-muted">diagram · coming soon</p>
    </div>
  );
}
