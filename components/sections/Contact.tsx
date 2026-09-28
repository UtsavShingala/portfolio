import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { SITE_CONTENT } from "@/content/site";
import { CONTACT_FORM, LINKS, mailtoHref } from "@/lib/constants";

/**
 * Closing CTA. Unnumbered and deliberately not a nav target.
 *
 * Each way of reaching out appears only once it actually works: the address
 * once a real one is set, the form once it has a delivery key. With neither,
 * the section falls back to a direct LinkedIn link — there is always one
 * working route, and never a fake address or a setup note shown to visitors.
 */
export function Contact() {
  // Widened to string: LINKS is `as const`, so comparing its literal to "" is a
  // type error whenever one of them happens to be set.
  const email: string = LINKS.email;
  const accessKey: string = CONTACT_FORM.accessKey;
  const hasEmail = email !== "";
  const hasForm = accessKey !== "";

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border">
      <Container className="py-section">
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-accent">
            {SITE_CONTENT.contact.eyebrow}
          </p>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl tracking-tight sm:text-4xl">
            {SITE_CONTENT.contact.heading}
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            {SITE_CONTENT.contact.body}
          </p>

          <div className="mt-10 flex justify-center">
            {hasEmail ? (
              // Address and copy share one border so they read as a single control.
              // On phones the icon drops and padding tightens: the full address
              // plus the copy button would otherwise overflow a 360px screen.
              <div className="inline-flex max-w-full items-stretch overflow-hidden rounded-md border border-accent/40 bg-accent/10">
                <a
                  href={mailtoHref}
                  className="inline-flex min-w-0 items-center gap-2 px-3 py-2.5 text-sm text-accent transition-colors hover:bg-accent/10 sm:px-4"
                >
                  <span className="hidden sm:inline-flex">
                    <MailIcon />
                  </span>
                  {LINKS.email}
                </a>

                <span aria-hidden="true" className="w-px bg-accent/30" />

                <CopyEmail />
              </div>
            ) : !hasForm && LINKS.linkedin ? (
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm text-accent transition-colors hover:bg-accent/15"
              >
                Message me on LinkedIn
                <ArrowIcon />
              </a>
            ) : null}
          </div>
        </div>

        {hasForm ? (
          <>
            {hasEmail ? (
              <div className="mt-14 flex items-center gap-4">
                <span className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs tracking-[0.15em] text-muted">
                  or send a message
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
            ) : null}

            <ContactForm />
          </>
        ) : null}
      </Container>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.5 7 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
