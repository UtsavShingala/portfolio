import type { Project } from "../types";

export const orderMatchingEngine: Project = {
  slug: "order-matching-engine",
  title: "Low-Latency Order-Matching Engine",
  summary:
    "A simulation of an exchange core — a central limit order book with price-time (FIFO) matching.",
  stack: ["Python", "FastAPI"],
  links: {
    github:
      "https://github.com/UtsavShingala/Low-Latency-Order-Matching-Engine-Exchange-Core-",
    // [PLACEHOLDER] demo video or GIF — backend projects don't need 24/7 hosting
    demo: "",
  },
  order: 1,

  overview:
    "An exchange core in miniature: orders arrive, rest on a central limit order book, and match against the opposite side by price first and arrival time second. The interesting part is not the matching rule but holding it under load — every operation on the book has to stay cheap as depth grows, and the tie-breaking has to be exactly fair or the simulation stops meaning anything.",
  keyDecisions: [
    "A sorted price-level structure with a deque per level, giving O(log N) insertion and removal while keeping arrival order within a price free to pop from — a plain sorted list of orders would have made every insertion linear.",
    "Strict price-time priority, enforced at the data-structure level rather than by sorting at match time. Fairness that depends on a sort step is fairness you can accidentally remove.",
    "Cancellations resolve through an index rather than a scan of the book, so cancel cost does not grow with depth.",
  ],
  metrics: [{ label: "Latency reduction", value: "~40%" }],
};
