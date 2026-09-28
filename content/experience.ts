import type { ExperienceEntry } from "./types";

/**
 * Roles are listed generically — title + timeframe only.
 * Never a company name; describe systems as capabilities.
 */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "ai-software-engineer",
    role: "AI Software Engineer",
    context: "Shipping product at a live travel CRM — remote",
    period: "May 2026 — Present",
    // Ordered to match the title: AI work first, then engineering, then
    // product calls.
    bullets: [
      // AI
      "Built the engine that runs LLM lead scoring — a durable database-backed job queue, a persisted circuit breaker that honours the provider's Retry-After, and a failure taxonomy in which throttling never counts against a lead — with the rule-based scorer kept as an instant fallback, so no lead is ever unscored.",
      "Made AI lead scoring a surface the team owns: they author the scoring prompt and its weightings, every edit saves as a new version with one active at a time, and every lead traces back to the prompt that scored it.",
      "Built the supplier-PDF import as a multimodal LLM pipeline behind four anti-hallucination gates — a strict response schema, temperature 0, verbatim-only prompt rules, and a code-level check that every extracted line exists in the source — after measuring that temperature 0 still formatted the same document three different ways.",
      "Scoped an open-ended 'extract any supplier PDF' ask down to an itinerary-only v1 where the model extracts and section-maps but never rewrites a sentence — a blank is visible, a wrong hotel is not.",

      // Engineering
      "Built two-way Gmail and WhatsApp integrations on one channel-agnostic message store — encrypted OAuth tokens, signature-verified webhooks, idempotent ingestion for at-least-once delivery, private signed-URL storage for customer media, and reply threading fixed by reading back the Message-ID the provider assigns on send.",
      "Cut a paginated inbox to sub-second loads by moving from offset to keyset pagination.",
      "Built an event-driven notification engine — events declared in code, copy editable in the CRM, every notification persisted first and delivered by a poller with an exactly-once ledger per channel, and scheduled sends held to civil-hour windows so an outage delays a message instead of dropping it.",
      "Closed security gaps across the CRM — SSRF on a server-side download, broken object-level authorization, money values trusted from the client, and prompt injection into the scoring model — and moved channel credentials into encrypted, admin-rotatable storage with a zero-downtime cutover.",
      "Root-caused production failures at the database layer — lost-update races behind random logouts, lock contention behind a live hang, a connection pooler that broke prepared statements — proving each cause with evidence before changing code.",
      "Built 100+ REST endpoints across 15+ CRM domains on one contract — standard envelopes, keyset pagination, per-route RBAC — plus 30+ additive, idempotent Postgres migrations, and wired the customer mobile app to the live API behind a typed error pipeline.",

      // Product
      "Designed the complete lead lifecycle end to end — dual intake, intent-based creation, dedup, routing, pipeline and terminal states — on a single record, so conversion is a state change rather than a move between tables.",
      "Set the duplicate rule to phone plus requested departure, since one person can legitimately raise two real trips, and made imports detect-and-confirm instead of auto-merge — keeping a person on an irreversible data write.",
      "Designed response-time SLAs across 6 channels — messaging and email clock the first human reply, source channels clock first exit from New, and stickers or closers like 'okay' never start the clock.",
    ],
  },
];
