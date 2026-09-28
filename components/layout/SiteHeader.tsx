"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/published";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Nav items are computed on the server from the section registry and passed in
 * as plain data, so the header can never drift out of sync with the pages —
 * and none of the content arrays behind them ship in the client bundle.
 *
 * Numbered sections render as one run; anything outside it (the blog) sits
 * after a divider, because it isn't a portfolio section.
 *
 * Collapses to a hamburger below the `nav` breakpoint (900px).
 */
export function SiteHeader({
  main,
  extra,
}: {
  main: NavItem[];
  extra: NavItem[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock background scroll while the mobile panel is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function isActive(item: NavItem) {
    return pathname === item.href;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/75 backdrop-blur-md">
      {/*
        Full width rather than the shared Container: the wordmark and the
        controls are meant to sit in the actual corners, and a max-width wrapper
        would strand them a couple of hundred pixels inside the edges.

        Nav fills the space between them but keeps a fixed gap and centres:
        `justify-between` stretched every gap to a different width depending on
        the label lengths around it, which read as uneven.
      */}
      <div className="px-6 sm:px-8">
        <div className="flex h-16 items-center gap-8">
          <Link
            href="/"
            className="shrink-0 text-base tracking-tight text-text transition-colors hover:text-accent"
          >
            {SITE.name}
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-6 nav:flex">
            {main.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                aria-current={isActive(section) ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors",
                  isActive(section)
                    ? "text-text"
                    : "text-muted hover:text-text",
                )}
              >
                {section.label}
              </Link>
            ))}

            {extra.length > 0 ? (
              <span aria-hidden="true" className="h-4 w-px bg-border" />
            ) : null}

            {extra.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                data-accent={section.accent}
                aria-current={isActive(section) ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors",
                  isActive(section)
                    ? "text-section-accent"
                    : "text-muted hover:text-section-accent",
                )}
              >
                {section.label}
              </Link>
            ))}
          </nav>

          {/* ml-auto pins this right on mobile, where the nav is hidden and
              there is no flex-1 element to push it. */}
          <div className="-mr-2 ml-auto flex shrink-0 items-center gap-1">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text transition-colors hover:text-accent nav:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className={cn(
          "border-t border-border bg-bg nav:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="px-6 sm:px-8">
          <nav className="flex flex-col py-2">
            {main.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(section) ? "page" : undefined}
                className={cn(
                  "border-b border-border py-4 text-base transition-colors",
                  isActive(section)
                    ? "text-text"
                    : "text-muted hover:text-text",
                )}
              >
                <span className="mr-3 font-mono text-xs text-muted">
                  {section.number}
                </span>
                {section.label}
              </Link>
            ))}

            {extra.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                onClick={() => setOpen(false)}
                data-accent={section.accent}
                aria-current={isActive(section) ? "page" : undefined}
                className={cn(
                  "mt-2 py-4 text-base transition-colors",
                  isActive(section)
                    ? "text-section-accent"
                    : "text-muted hover:text-section-accent",
                )}
              >
                {section.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
