import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ProfileCards } from "@/components/ui/ProfileCards";
import { SITE_CONTENT } from "@/content/site";
import { ASSETS, SITE } from "@/lib/constants";

/**
 * Photo on the left, and on the right the name first, then the tagline and the
 * about. The name used to sit under the photo, which put it lower on the page
 * than the tagline — the eye landed on the sentence before it knew whose it was.
 */
export function Hero() {
  return (
    <section className="relative isolate scroll-mt-24">
      <div
        aria-hidden="true"
        className="backdrop-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem]"
      />

      <Container className="pt-20 pb-section sm:pt-28">
        <div className="grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
          <Image
            src={ASSETS.avatar}
            alt={SITE.name}
            width={176}
            height={176}
            priority
            className="h-36 w-36 rounded-full border border-border object-cover sm:h-44 sm:w-44"
          />

          <div>
            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              {SITE.name}
            </h1>

            <p className="mt-3 text-lg text-muted">{SITE.role}</p>

            <p className="mt-10 max-w-3xl text-xl leading-snug text-text sm:text-2xl">
              {SITE_CONTENT.hero.tagline}
            </p>

            <p className="mt-5 max-w-3xl leading-relaxed text-muted">
              {SITE_CONTENT.hero.about}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm text-accent transition-colors hover:bg-accent/15"
              >
                Get in touch
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>

              {ASSETS.resume ? (
                <a
                  href={ASSETS.resume}
                  download
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-text transition-colors hover:border-muted"
                >
                  Download résumé
                  <DownloadIcon />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <ProfileCards className="mt-16" />
      </Container>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
