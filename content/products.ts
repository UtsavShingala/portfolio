import type { ShippedProduct } from "./types";

/**
 * Live products, kept separate from projects on purpose: a project shows what
 * you can build, a product shows what you shipped and kept running.
 *
 * Product-level facts only. Endpoints, internal service names and usage
 * numbers stay out — the PrepWiser source doc is marked internal.
 */
export const PRODUCTS: ShippedProduct[] = [
  {
    slug: "duellia",
    name: "Duellia",
    url: "https://duellia.com",
    domain: "duellia.com",
    status: "live",
    summary:
      "A real-time 1v1 mental math duelling platform where a duel is just a link you drop in a group chat.",
    stack: ["Go", "WebSockets", "PostgreSQL", "Next.js", "TypeScript", "Docker", "Caddy"],
    // [PLACEHOLDER] repo URL if public, otherwise delete this line
    github: "",

    overview: [
      "Duellia turns mental arithmetic into a competitive sport that lives in a link rather than an app store. The core loop is a 90-second 1v1 duel: both players receive an identical problem stream and race to solve the most. No app, no signup.",
      "Beyond duels, an arena lets one person open a room with a time window — anywhere from 15 minutes to 24 hours — and share a single link with a whole group. Everyone plays whenever they're free inside that window while the leaderboard updates live, which removes the coordination problem that normally kills real-time multiplayer. Atlas adds a solo mode: a level-based climb through generated pattern puzzles with no opponent and no clock.",
      "Four generated game modes ship today — arithmetic, sequences, flash (hold a running sum as numbers vanish), and matrix (deduce the rule, find the missing cell). Because problems are generated rather than drawn from a fixed bank, no two sessions repeat.",
    ],
    keyDecisions: [
      "Server-authoritative engine: the client never holds the answer, and every keystroke is validated server-side with no submit button. Combined with typed answers instead of multiple choice, cheating is structurally impossible rather than merely discouraged — which is what lets the Elo rating mean something.",
      "Deterministic seeded problem generation: the same seed reproduces an identical stream, so asynchronous players can race the exact same problems at different times without a live connection.",
      "An extensible mode registry — a new game is a generator plus one registry entry, mirrored across a single Go map and a single TypeScript definition.",
      "Guest-first identity: full play with no account, and signing in upgrades the session to a rated identity without losing progress.",
      "Diagnosed and fixed a foreign-key lock-ordering deadlock under concurrent duel inserts by acquiring row locks in a deterministic order.",
    ],
    metrics: [
      { label: "Duel length", value: "90s" },
      { label: "Game modes", value: "4" },
      { label: "Arena window", value: "15m – 24h" },
    ],
  },
  {
    slug: "prepwiser",
    name: "PrepWiser",
    url: "https://prepwiser.in",
    domain: "prepwiser.in",
    status: "live",
    summary:
      "A practice-and-revision platform for JEE Mains and Advanced aspirants, built on ~9,000 tagged real past-paper questions.",
    stack: ["Go", "Gin", "PostgreSQL", "Redis", "React", "TypeScript", "Tailwind"],
    github: "",

    overview: [
      "PrepWiser is built around a large, well-tagged bank of real previous-year JEE questions plus a curated standard bank, layered with tools that turn raw practice into durable learning: full-length mock tests under exam conditions, an AI doubt solver, spaced-repetition recall, rapid revision decks and a daily challenge.",
      "The core loop is practice → check the answer and worked solution → mock test → review mistakes → revise and recall. The question library and past papers are fully usable without an account, so the product's most valuable asset is also its acquisition surface.",
      "The flagship feature, Comeback, is for students who are behind on the syllabus. It turns \"I'm behind\" into a day-by-day study plan to the exam date, with a realistic marks-improvement range and check-off tracking — and replans the remaining work when the student falls behind.",
    ],
    keyDecisions: [
      "Comeback's estimate is a marks range, not a single number, and every chapter's weight is derived from a scan of real past papers with its evidence shown in the UI — so the number reads as data-backed rather than invented. One capacity allocation drives both the estimate and the calendar, so the two can never contradict each other.",
      "Mock tests snapshot their questions into the attempt at start, so editing the question bank never changes a test someone is sitting. Responses autosave continuously, attempts carry a hard expiry, and scoring runs server-side under real JEE marking rules.",
      "Answer-checking is deliberately open to guests: they can attempt any question and read the solution, and the service simply skips persistence. That makes the whole library useful before sign-up — which is the point of it.",
      "Crawlers get server-rendered pages while people get the single-page app, so the library is indexable — but worked solutions are never rendered to bots, only enough to index the page.",
      "Spaced repetition runs on FSRS with the maximum review interval capped at 60 days, because a card scheduled eight months out is useless to someone preparing for an exam this year.",
    ],
    metrics: [
      { label: "Questions", value: "9,600+" },
      { label: "Real past-paper questions", value: "9,000+" },
      { label: "Past papers", value: "128" },
      { label: "Chapters mapped", value: "154" },
    ],
  },
];

export function getProduct(slug: string): ShippedProduct | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
