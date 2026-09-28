import type { ProductDecision } from "./types";

/**
 * Each decision gets its own page at /decisions/<slug>.
 *
 * A decision belongs to the role it was made in: `role` is that experience
 * entry's `id`, and the Experience page lists the decision under it, grouped by
 * `area`. Keep entries in display order — groups appear in the order their
 * first entry does.
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
  // AI
  {
    slug: "rule-score-as-floor",
    role: "ai-software-engineer",
    area: "AI",
    title: "Rule-based scoring demoted to a floor, not deleted",
    summary:
      "The LLM scores every lead, but a rule-based score lands first, instantly — so no lead is ever unscored, even during a model outage.",
    problem:
      "Lead scoring was moving to an LLM, and the plan was to delete the old rule-based scorer. But model calls take seconds, get rate-limited and sometimes fail — and a lead with no score is invisible to anyone triaging by score.",
    options:
      "Delete the rule scorer and wait for the model, or keep it as a provisional score that the model later replaces.",
    choice:
      "The rule score is written the moment a lead is created and is labelled provisional; the LLM score replaces it asynchronously when it lands. A rate limit pauses the queue instead of failing leads, and a kill switch reverts to rules only, without a deploy.",
    tradeoff:
      "Two scorers to maintain, and a 'provisional' label people have to understand. In exchange, a model outage lowers scoring quality instead of removing scoring altogether.",
  },
  {
    slug: "versioned-lead-scoring",
    role: "ai-software-engineer",
    area: "AI",
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
  {
    slug: "extraction-scope",
    role: "ai-software-engineer",
    area: "AI",
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

  // CRM
  {
    slug: "one-lead-record",
    role: "ai-software-engineer",
    area: "CRM",
    title: "One record for a lead's whole life",
    summary:
      "A waiting enquiry and an active pipeline lead are the same record at different stages — so conversion is a state change, not a move between tables.",
    problem:
      "Enquiry capture, CSV import, routing and the sales pipeline had been designed as separate screens with no model connecting them. Treating a waiting enquiry and a pipeline lead as different things would mean a table for each — and moving a lead from one to the other would break every task, note and stage-history entry that points at it.",
    options:
      "A table per stage — demand, pipeline, outcomes — or one leads table with the lifecycle modelled as state.",
    choice:
      "One leads table carries the whole lifecycle: two ways in (enquiry and CSV import), deduplication, routing, a live pipeline, then Booked or Lost. A waiting enquiry becomes an active lead with a one-field change when its tour launches. Booked and Lost moved off the live board into sections of their own, because finished outcomes pile up without limit and a board is for leads someone can still act on.",
    tradeoff:
      "Every query has to filter by lifecycle state, and one table carries fields that only matter at some stages. In exchange, nothing is ever copied between tables, every reference to a lead survives its whole life, and conversion can't lose history.",
  },
  {
    slug: "intent-creates-leads",
    role: "ai-software-engineer",
    area: "CRM",
    title: "A lead is created by intent, not by a broadcast",
    summary:
      "Announcing a new tour to a customer list creates no leads — only a reply does, or an ask the customer made beforehand.",
    problem:
      "When a new tour opens, staff announce it to a list of customers. The first build created a pipeline lead for everyone the announcement went to — filling the pipeline with people who never responded, and quietly corrupting conversion rate and pipeline value, because the denominator filled with non-intent.",
    options:
      "Create a lead for every recipient of the announcement, or create one only when there is real intent.",
    choice:
      "Sending is a marketing action; a reply is a sales signal. A broadcast creates nothing, and a reply creates the lead. The one exception is a customer who had personally asked to be told when the tour opened — that ask was already the enquiry, so selecting them does create a lead. Same action on screen, opposite meaning, decided by whether intent existed in the real world.",
    tradeoff:
      "The launch screen has to know why each customer is on the list, which is more modelling than a blanket rule. In exchange, 'pipeline' keeps meaning expressed interest, and every metric built on it stays honest.",
  },
  {
    slug: "duplicate-leads",
    role: "ai-software-engineer",
    area: "CRM",
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
    slug: "one-message-store",
    role: "ai-software-engineer",
    area: "CRM",
    title: "WhatsApp and email in one inbox, on one message store",
    summary:
      "WhatsApp went onto the store email already used, instead of tables of its own — one inbox, one unread model, one place to look.",
    problem:
      "Consultants talk to customers on WhatsApp and email, and needed both in one thread per lead. The obvious build was a parallel set of WhatsApp tables with its own inbox — two copies of the same idea, drifting apart. And the two channels behave in opposite ways: email is pulled on a schedule, WhatsApp is pushed by webhook, delivered at least once and sometimes out of order.",
    options:
      "Separate tables and screens per channel, or put WhatsApp on the existing channel-agnostic message store and handle each channel's differences at the edges.",
    choice:
      "One store for both. WhatsApp ingestion is idempotent on the provider's message id, so a retried webhook never shows a message twice; delivery ticks only ever move forward; and the inbox pages by cursor — headers first, a thread's messages only when it opens — so load time doesn't grow with mailbox size.",
    tradeoff:
      "The shared model has to carry each channel's quirks — email subjects, WhatsApp's 24-hour reply window — as per-channel rules instead of separate schemas. In exchange, inbound WhatsApp text appeared in the existing thread with no new front-end work, and one model serves both channels.",
  },
  {
    slug: "response-time-sla",
    role: "ai-software-engineer",
    area: "CRM",
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
    slug: "lead-routing-funnel",
    role: "ai-software-engineer",
    area: "CRM",
    title: "Routing leads as a narrowing funnel, not first-match-wins",
    summary:
      "Each routing rule narrows the pool of eligible consultants, and the least-loaded consultant left in the pool gets the lead.",
    problem:
      "Lead assignment ran rules in priority order, and the first rule a lead matched assigned it. A lead with several attributes — a custom trip on a high budget — was routed on only one of them, and a high-priority rule grabbed leads before load balancing ever ran, so specialists overloaded while others sat idle.",
    options:
      "Keep first-match-wins and add more rules, or treat every rule as a filter on the pool of candidates.",
    choice:
      "A progressive-narrowing funnel: each rule filters the pool, a filter that would empty the pool is relaxed rather than applied, and the final pick is the least-loaded consultant among those left. Relationship rules — repeat customers and referrals — outrank attribute rules, and rule order encodes which constraint is given up last when two conflict.",
    tradeoff:
      "Harder to explain than 'the first rule wins', and rule order now carries meaning admins have to understand. In exchange, every attribute is honoured and load balances across the whole team, not inside a single rule.",
  },
  {
    slug: "proposal-channel-sections",
    role: "ai-software-engineer",
    area: "CRM",
    title: "One proposal, two channel views",
    summary:
      "Each section of a proposal is marked for email, WhatsApp or both, so facts are entered once and the two messages can't drift apart.",
    problem:
      "Proposals go out by email and WhatsApp, which have opposite norms — email wants a formatted document, WhatsApp a short message you can scan. Tools usually force one generic message for both, or two separately written ones whose prices drift apart over time.",
    options:
      "One shared message for both channels, two independently written messages, or one set of content with per-channel visibility.",
    choice:
      "A proposal is one ordered set of sections, each with inline include-in-email and include-in-WhatsApp toggles, and each channel renders only its own sections. Sections can be reordered — whether the price comes early or late is a selling decision — with the greeting and call to action fixed at the ends, and a live preview shows both outputs.",
    tradeoff:
      "The preview has to match exactly what ships, which took real work — a preview showing something the channel strips breaks trust. In exchange, a consultant tailors both messages in seconds, and the price is written once.",
  },

  // Customer app
  {
    slug: "enquiry-status-lifecycle",
    role: "ai-software-engineer",
    area: "Customer app",
    title: "A missing 'completed' state, and an action for every status",
    summary:
      "Enquiries gained a terminal 'Trip completed' state so the label never lies, and each status got the one action its user actually needs.",
    problem:
      "A customer's enquiries moved from sent to booked, or to closed — but nothing came after a trip ended, so a finished trip still read 'Trip booked'. A returning customer could see two booked trips and believe both were upcoming. The list was also sorted by date alone, so an old trip could sit above a live one.",
    options:
      "Relabel the existing states, or model the lifecycle properly and design the list around it.",
    choice:
      "Added 'Trip completed', which an enquiry moves to after the trip's last day. Each state got its own action — edit while sent, go to the trip once booked, start again if closed — and completed deliberately got none, because people open it to look something up, not to act. The list groups live enquiries above settled ones, most recent activity first within each group.",
    tradeoff:
      "One more state to keep in step with trip dates, and a card with no action can look unfinished. In exchange, a status always describes reality, and the most actionable enquiry is always at the top.",
  },
  {
    slug: "referral-attribution",
    role: "ai-software-engineer",
    area: "Customer app",
    title: "Referral channels are captured at share time, or never",
    summary:
      "A bare referral code carries no record of how it travelled, so channel attribution has to be recorded at the moment of sharing.",
    problem:
      "The referrals screen promised a breakdown of referrals by channel — WhatsApp, email, direct. But a referral code is just text: nothing about it records the channel it was sent through. The breakdown was reporting on data that did not exist.",
    options:
      "Infer the channel after the fact, or route every share through a point the app controls.",
    choice:
      "Per-channel share buttons instead of the operating system's share sheet, and links tagged with their channel, recording outbound taps and inbound link opens separately. Codes pasted without a link land in an honest 'unknown' bucket.",
    tradeoff:
      "Users lose the familiar system share sheet, and some referrals will always be 'unknown'. In exchange, every number in the breakdown is one that was actually measured.",
  },
  {
    slug: "otp-cost-control",
    role: "ai-software-engineer",
    area: "Customer app",
    title: "Putting the SMS cost control where the cost happens",
    summary:
      "A per-phone cap on one-time codes replaced a cap on sessions — the money is spent when a code is requested, not when a session is created.",
    problem:
      "Login is by a one-time code sent over SMS, and every code costs money. Abuse, or a bug, could burn through the SMS budget.",
    options:
      "Cap logins by the number of active sessions, or cap one-time-code requests per phone and per IP.",
    choice:
      "My first design capped active sessions. Tracing the cost through showed it guarded the wrong door: a log in, sign out, log in loop keeps the session count low while still sending codes. I switched to a per-phone request cap (5 an hour, 10 a day), a per-IP cap, and a daily budget circuit breaker.",
    tradeoff:
      "More moving parts than one session limit, and a real user who keeps mistyping can hit the hourly cap. In exchange, the control sits exactly where the money is spent, so no loop can get around it.",
  },
  {
    slug: "photo-access-rule",
    role: "ai-software-engineer",
    area: "Customer app",
    title: "Who can see a trip's photos, decided before launch",
    summary:
      "A traveller sees a photo only with a confirmed booking on that photo's departure — written down as a rule at spec time, not discovered in production.",
    problem:
      "Tour managers upload photos during trips, and travellers browse them in the app. Nothing specified what stopped a traveller on one tour from seeing another tour's photos when two tours ran on the same dates.",
    options:
      "Rely on the app only ever linking to your own trip, or define an explicit access rule that the server enforces.",
    choice:
      "An explicit rule: a user can see a photo only if they hold a confirmed booking on that photo's departure. The happy path never needed it; a wrong link or a guessed URL would have.",
    tradeoff:
      "Every photo read needs an authorization check against bookings, rather than a plain link. In exchange, a privacy leak is closed at the spec stage, where fixing it costs nothing.",
  },
];

export function getDecision(slug: string): ProductDecision | undefined {
  return PRODUCT_DECISIONS.find((decision) => decision.slug === slug);
}
