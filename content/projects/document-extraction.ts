import type { Project } from "../types";

export const documentExtraction: Project = {
  slug: "document-extraction",
  title: "Document-Extraction Engine",
  summary:
    "Turns unstructured PDFs into structured fields that come out the same on a second run.",
  stack: ["Python", "LLM APIs", "Semantic matching"],
  links: {
    // [PLACEHOLDER] no public repo found on your GitHub — add the URL when it exists.
    github: "",
    demo: "",
  },
  order: 3,

  overview:
    "Extraction from documents is easy to demo and hard to trust. The same file run twice will happily produce a different number of line items, or match a name to the wrong catalogue entry, and neither failure announces itself. This engine treats consistency as the actual requirement: parse, extract, match against a known catalogue in layers, then validate and check the result against the previous run before returning it.",
  keyDecisions: [
    "Layered matching — semantic, then tokenized, then a semantic-exclusion pass — because one similarity threshold either misses real matches or lets near-misses through, and the exclusion pass is what removes the false positives.",
    "Temperature-tuned determinism so repeat runs agree. This is the case where low temperature is the right tool: the goal is reproducibility, and the source document is already in context, so the usual hallucination argument does not apply.",
    "A consistency check on counts across runs, so a silently dropped line item surfaces as a failure instead of as clean-looking output.",
    "Defined merge-versus-replace semantics on re-extraction, so running it again on an edited document does not quietly discard fields a human corrected.",
  ],
};
