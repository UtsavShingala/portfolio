/**
 * Hero, about and closing CTA copy.
 * Everything marked [PLACEHOLDER] is scaffold filler — replace, don't extend.
 */
export const SITE_CONTENT = {
  /** Used for <meta description> and OG. Keep under ~160 characters. */
  metaDescription:
    "AI Software Engineer building production LLM systems and low-latency backends. 2026 CSE grad shipping LLM pipelines, integrations and live products.",

  hero: {
    tagline: "I build production LLM systems and low-latency backends.",
    about:
      "2026 CSE grad shipping production LLM pipelines, integrations and backend systems — at work, and on two live products. I care about the unglamorous parts — reliability, latency, correctness — and I like turning messy, real-world problems into systems that hold up in production.",
  },

  contact: {
    /** Rendered like an unnumbered section label — no dash, no number. */
    eyebrow: "drop a line",
    heading: "Open to AI and backend engineering roles.",
    body: "Production LLM systems, low-latency backends, and the reliability work around them.",
  },
} as const;
