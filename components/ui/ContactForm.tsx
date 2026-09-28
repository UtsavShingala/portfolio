"use client";

import { useState } from "react";
import { CONTACT_FORM, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Posts straight from the browser to a third-party form endpoint — the site has
 * no API routes and stays fully static.
 *
 * Without an access key the form still renders but submit is disabled and says
 * so. Hiding it entirely made it impossible to review the layout; a silent
 * no-op submit would be worse still.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const configured = CONTACT_FORM.accessKey !== "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch(CONTACT_FORM.endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message ?? "Something went wrong.");
      }

      form.reset();
      setStatus("sent");
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error
          ? cause.message
          : "Could not send. Try the email address above.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 text-left">
      <input type="hidden" name="access_key" value={CONTACT_FORM.accessKey} />
      <input
        type="hidden"
        name="subject"
        value={`New message from ${SITE.domain}`}
      />
      {/* Honeypot: bots fill it, humans never see it. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Three across at full width. Stacking one wide input per row would
          leave each field a 1100px line to type a name into. */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          hint="optional"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="font-mono text-xs tracking-[0.15em] text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={fieldClasses}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!configured || status === "sending"}
          className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm text-accent transition-colors hover:bg-accent/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            status === "error" ? "text-text" : "text-muted",
          )}
        >
          {status === "sent" ? "Thanks — I'll get back to you." : null}
          {status === "error" ? error : null}
        </p>
      </div>

      {!configured ? (
        <p className="mt-5 rounded-md border border-dashed border-border px-4 py-3 text-sm text-muted">
          <span className="font-mono text-xs tracking-[0.15em]">setup</span> —
          sending is off until an access key is set. Get a free one at
          web3forms.com and paste it into{" "}
          <span className="font-mono text-xs">CONTACT_FORM.accessKey</span> in{" "}
          <span className="font-mono text-xs">lib/constants.ts</span>.
        </p>
      ) : null}
    </form>
  );
}

const fieldClasses =
  "mt-2 w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-muted";

function Field({
  label,
  name,
  type = "text",
  hint,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-xs tracking-[0.15em] text-muted"
      >
        {label}
        {hint ? <span className="ml-2 normal-case">({hint})</span> : null}
      </label>
      <input id={name} name={name} type={type} className={fieldClasses} {...rest} />
    </div>
  );
}
