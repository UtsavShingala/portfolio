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
    bullets: [
      "Designed the complete lead lifecycle end to end — dual intake, intent-based creation, dedup, routing, pipeline and terminal states — on a single record, so conversion is a state change rather than a move between tables.",
      "Set the duplicate rule to phone plus requested departure, since one person can legitimately raise two real trips, and made imports detect-and-confirm instead of auto-merge — keeping a person on an irreversible data write.",
      "Made AI lead scoring a surface the team owns: they author the scoring prompt and its weightings, every edit saves as a new version with one active at a time, and every lead traces back to the prompt that scored it.",
      "Designed response-time SLAs across 6 channels — messaging and email clock the first human reply, source channels clock first exit from New, and stickers or closers like 'okay' never start the clock.",
      "Scoped an open-ended 'extract any supplier PDF' ask down to an itinerary-only v1 where the model extracts and section-maps but never rewrites a sentence — a blank is visible, a wrong hotel is not.",
      "Cut a paginated inbox to sub-second loads by moving from offset to keyset pagination.",
    ],
  },
];
