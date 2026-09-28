import type { Project } from "../types";

export const ragAssistant: Project = {
  slug: "rag-assistant",
  title: "RAG Assistant",
  summary: "Retrieval-augmented Q&A over multi-format documents.",
  stack: ["Python", "LLMs", "Vector store"],
  links: {
    // [PLACEHOLDER] closest match on your GitHub is `ai-knowledge-assistant`,
    // but it has no description so I did not assume. Confirm and paste the URL.
    github: "",
    demo: "",
  },
  order: 5,

  overview:
    "Question answering over a mixed document set — retrieval finds the relevant passages, the model answers from them, and the answer points back at its source. The work is in the retrieval half rather than the generation half: chunking that respects document structure, and a threshold below which the honest answer is that the corpus does not cover it.",
  // [PLACEHOLDER] The plan doc gave no key decisions for this one. Worth writing
  // from what you actually built: chunking strategy and why, how you set the
  // relevance threshold, and what the system does when nothing clears it.
  keyDecisions: [
    "[PLACEHOLDER] A decision, the alternative you rejected, and why.",
    "[PLACEHOLDER] A second decision.",
  ],
};
