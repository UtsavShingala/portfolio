import { getSection, type SectionId } from "@/content/sections";
import { isPlaceholder } from "@/lib/placeholder";
import { Container } from "./Container";
import { SectionLabel } from "./SectionLabel";

/**
 * Page header + body for a section page.
 *
 * `data-accent` comes from the registry and sets --section-accent for
 * everything inside, so the number and the glow share one hue per section
 * without any component knowing which colour it is.
 */
export function Section({
  id,
  children,
}: {
  id: SectionId;
  children: React.ReactNode;
}) {
  const section = getSection(id);

  return (
    <div data-accent={section.accent ?? "green"} className="relative isolate">
      <div
        aria-hidden="true"
        className="backdrop-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem]"
      />

      <Container className="pt-16 pb-section sm:pt-20">
        <SectionLabel id={id} />

        <h1 className="mt-4 text-4xl tracking-tight sm:text-5xl">
          {section.heading}
        </h1>

        {section.intro && !isPlaceholder(section.intro) ? (
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            {section.intro}
          </p>
        ) : null}

        <div className="mt-14">{children}</div>
      </Container>
    </div>
  );
}
