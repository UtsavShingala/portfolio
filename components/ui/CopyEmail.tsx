"use client";

import { useEffect, useRef, useState } from "react";
import { LINKS } from "@/lib/constants";

/**
 * Recruiters copy an address into their tracker — they don't fill in forms.
 * So the address is visible text, clickable as mailto, and copyable in one tap.
 * Uses the clipboard API only; nothing is persisted.
 *
 * Renders borderless: Contact joins it to the mailto link inside one shared
 * border so the pair reads as a single control.
 */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context or denied) — the mailto link
      // and the visible address both still work, so there is nothing to do.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="inline-flex shrink-0 items-center gap-2 px-3 text-accent transition-colors hover:bg-accent/10 sm:px-4"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span className="font-mono text-xs">{copied ? "copied" : "copy"}</span>
    </button>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
