import type { ArchitecturePattern } from "./types";

/**
 * General architecture patterns. Never company names, real endpoints, internal
 * schemas or client data — describe the shape of the system, not the system.
 *
 * Each entry gets its own page at /architecture/<slug>, so keep slugs short and
 * descriptive once you replace these placeholders.
 *
 * `diagram` points at a file under /public/diagrams. Omit it and the card and
 * page render the dashed 16:9 placeholder slot instead.
 */
export const ARCHITECTURE_PATTERNS: ArchitecturePattern[] = [
  {
    slug: "messaging-integration",
    title: "Two-way messaging integration",
    summary:
      "Accepting messages from an external channel and sending them back out, without ever double-posting.",
    flow: "Webhook -> HMAC verify -> Idempotent ingest -> Queue -> Store",
    description:
      "Inbound traffic arrives as webhooks from a provider that guarantees at-least-once delivery, which means duplicates are normal rather than exceptional. Each payload is verified, deduplicated on a stable message key, queued, and only then written. Outbound messages go the other way — send, track delivery status, retry what failed.",
    decisions: [
      "HMAC verification on every webhook, so an endpoint that has to be public still only accepts payloads the provider actually signed.",
      "Idempotent ingestion keyed on the provider's message id — at-least-once delivery means the same message will arrive twice, and a retry must never post twice.",
      "Delivery-status tracking on the outbound side closes the loop: a send that silently failed is worse than one that visibly did.",
    ],
  },
  {
    slug: "external-api-integration",
    title: "Resilient external API integration",
    summary:
      "Calling a third-party API that will rate-limit you, expire your tokens, and go down — without taking your own flow down with it.",
    flow: "OAuth + encrypted tokens -> API call -> Rate-limit-aware retry -> Fallback -> Response handling",
    description:
      "Tokens are obtained over OAuth and stored encrypted. Calls go through a circuit breaker that reads the provider's own backpressure signals rather than guessing at them. When the provider is unavailable, the caller gets a defined fallback instead of an exception.",
    decisions: [
      "The circuit breaker honours 429 and Retry-After rather than retrying on a fixed schedule — the provider is telling you when to come back, and ignoring it turns a slowdown into a ban.",
      "Tokens are encrypted at rest; a third-party access token is a credential, not a config value.",
      "A graceful fallback path means a provider outage degrades one feature instead of failing the request that contained it.",
    ],
  },
  {
    slug: "notification-system",
    title: "Multi-channel notification system",
    summary:
      "One event, several channels, and a dispatch cutoff so a queued backlog never fires as real messages.",
    flow: "Event -> Channel router -> Template -> Dispatch -> Delivery tracking -> Retry",
    description:
      "A single domain event fans out to whichever channels apply — email, messaging, in-app. Routing, templating and dispatch are separate stages so a new channel is a router entry rather than a rewrite. Every dispatch is tracked and retried on failure.",
    decisions: [
      "One event fans out to channels rather than each feature sending its own notifications — otherwise the rules for who gets told what end up scattered across the codebase.",
      "A dispatch cutoff discards anything older than a threshold. Without it, enabling a transport that had been off replays a queue of stale notifications as if they were new — which reaches real people.",
      "Delivery tracking per channel, because 'sent' and 'delivered' are different facts and only one of them is worth showing a user.",
    ],
  },
  {
    slug: "llm-scoring-pipeline",
    title: "LLM scoring pipeline",
    summary:
      "Running records through a language model at volume, with concurrency that is safe and a fallback that guarantees an answer.",
    flow: "Input -> Durable job queue (SKIP LOCKED) -> Circuit breaker -> LLM call -> Validation -> Rule-based fallback -> Store",
    description:
      "Work lands in a durable queue rather than being processed inline, so a crash mid-batch loses nothing. Workers claim jobs with SKIP LOCKED, which lets several run concurrently without two of them picking up the same record. Model output is validated before it is trusted, and anything that fails validation falls through to a deterministic rule-based scorer.",
    decisions: [
      "A durable queue with SKIP LOCKED gives safe concurrency without a distributed lock — the database already knows how to hand each worker a different row.",
      "Claim, process and write in a single transaction, so a crash leaves the job claimable again rather than half-done.",
      "A rule-based fallback runs when the model is unavailable or its output fails validation, so no record is ever left unscored — a missing score is harder to detect downstream than a conservative one.",
      "A kill-switch reverts to rules-only without a deploy, because the fastest fix for a misbehaving model is to stop calling it.",
    ],
  },
  {
    slug: "document-extraction",
    title: "Document extraction engine",
    summary:
      "Turning unstructured documents into structured fields that come out the same on a second run.",
    flow: "Upload -> Parse -> LLM extraction -> Semantic + tokenized matching -> Validation -> Consistency check -> Structured output",
    description:
      "Documents are parsed, extracted by a language model, then matched against a known catalogue using layered strategies rather than a single similarity score. The output is validated and checked for consistency before it is returned, and re-extraction has defined merge semantics rather than silently replacing prior work.",
    decisions: [
      "A wrong-document guard rejects input that does not look like what the pipeline expects, instead of confidently extracting fields from the wrong file.",
      "Layered matching — semantic, then tokenized, then semantic exclusion — because a single similarity threshold either misses real matches or accepts near-misses, and the exclusion pass is what kills the false positives.",
      "Temperature-tuned determinism so a second run over the same document produces the same fields. Here low temperature is the right tool: the goal is reproducibility, and the source document is already in context.",
      "Orphan-file cleanup on failure, so a failed run does not leave storage holding files nothing references.",
    ],
  },
];

export function getPattern(slug: string): ArchitecturePattern | undefined {
  return ARCHITECTURE_PATTERNS.find((pattern) => pattern.slug === slug);
}

/** Shown small and muted wherever a diagram appears. */
export const ARCHITECTURE_FOOTNOTE =
  "Diagrams represent general architectural patterns, not proprietary implementations.";
