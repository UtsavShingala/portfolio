import type { ProductDecision } from "./types";

/**
 * Each decision gets its own page at /decisions/<slug>.
 *
 * The four fields are the at-a-glance summary; `detail` carries the actual
 * writeup and can run as long as the decision deserves. Leave `detail` off and
 * the page renders the four fields alone — a decision can ship short and grow
 * a narrative later.
 *
 * Decisions from work are described as product choices, never with the
 * company's name, internal schemas or client data.
 */
export const PRODUCT_DECISIONS: ProductDecision[] = [
  {
    slug: "duplicate-leads",
    title: "Detect-and-confirm over auto-merge for duplicate leads",
    summary:
      "Likely duplicates are flagged for a person to confirm, keyed on phone plus departure — because one person can raise two real trips.",
    problem:
      "Leads arrive from enquiries and CSV imports, and many are duplicates. But merging two leads is an irreversible write: a wrong merge silently destroys a real enquiry, and nobody notices until a customer does.",
    options:
      "Auto-merge duplicates on import, or detect likely duplicates and ask a person to confirm each one.",
    choice:
      "Detect-and-confirm, with the duplicate key set to phone plus requested departure. Phone alone would merge genuinely separate enquiries — the same person legitimately plans two different trips.",
    tradeoff:
      "Imports take longer, because every flagged pair needs a human decision. In exchange, no real enquiry is ever lost to an automated merge.",
  },
  {
    slug: "extraction-scope",
    title: "Scoping 'extract any PDF' down to an itinerary-only v1",
    summary:
      "The model extracts and maps sections but never rewrites a sentence — a blank field is visible, a wrong one is not.",
    problem:
      "The ask was open-ended: extract any supplier PDF into the CRM. Supplier documents vary widely, and a confidently wrong field is worse than an empty one — nobody goes looking for an error they can't see.",
    options:
      "Ship general extraction across every supplier document type, or narrow v1 to one document type and restrict what the model is allowed to do with it.",
    choice:
      "An itinerary-only v1 in which the model extracts and section-maps the content but never rewrites a sentence, so everything that lands in the CRM is verbatim from the source.",
    tradeoff:
      "Auto-fill shipped at 2/10 — deliberately conservative. A blank gets noticed and filled by a person; a wrong hotel does not.",
  },
  {
    slug: "response-time-sla",
    title: "Defining what starts and stops the response-time clock",
    summary:
      "One SLA across 6 channels, with the clock defined per channel so the number measures real responsiveness.",
    problem:
      "Response time had to be measured across 6 channels that behave differently: a messaging thread and a lead from a source channel don't share a meaning of 'responded'. And trivial messages — a sticker, an 'okay' — would start the clock on nothing.",
    options:
      "One uniform rule for every channel, or a per-channel definition of when the clock starts and stops.",
    choice:
      "Messaging and email clock the first human reply; the 4 source channels clock first exit from New. Stickers and an admin-editable list of closer phrases ('okay', 'theek hai') never start the clock.",
    tradeoff:
      "Harder to explain than a single rule, and the closer-phrase list needs upkeep — which is why admins can edit it rather than engineers.",
  },
  {
    slug: "versioned-lead-scoring",
    title: "AI lead scoring as a versioned surface the team owns",
    summary:
      "The team authors the scoring prompt; every edit is a new version, and every lead traces back to the prompt that scored it.",
    problem:
      "Lead scoring runs on a prompt, and the people who know what a good lead looks like are the sales team, not engineers. But a prompt edited in place makes every past score unexplainable.",
    options:
      "Keep the prompt engineer-owned in code, or let the team edit it directly in the CRM.",
    choice:
      "The team authors the prompt and its weightings in the CRM. Each edit saves as a new version with exactly one active at a time, and every lead records which version scored it.",
    tradeoff:
      "More machinery than a config value — version history and per-lead provenance — in exchange for scores that can always be explained after the prompt changes.",
  },
];

export function getDecision(slug: string): ProductDecision | undefined {
  return PRODUCT_DECISIONS.find((decision) => decision.slug === slug);
}
