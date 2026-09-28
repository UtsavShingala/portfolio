import type { Project } from "../types";

export const candidateRanking: Project = {
  slug: "candidate-ranking",
  title: "LLM Candidate-Ranking System",
  // Condensed from your own repo description.
  summary:
    "Automates candidate evaluation with dynamic JD-based scoring, semantic matching and explainable AI.",
  stack: ["Python", "LLMs", "Semantic matching", "Streamlit"],
  links: {
    github: "https://github.com/UtsavShingala/LLM_Powered_Candidate_Ranking_System",
    demo: "",
  },
  order: 4,

  // Seeded from your repo description — expand it with the "why" and the numbers.
  overview:
    "Automates candidate evaluation using dynamic JD-based scoring, semantic matching and explainable AI. Covers resume parsing, skill-gap analysis, candidate ranking, AI feedback generation, and an interactive dashboard for hiring decisions.",
  // [PLACEHOLDER] The plan doc gave no key decisions for this one, and inventing
  // them would put claims in your mouth. Two or three lines, each naming the
  // alternative you rejected — e.g. why semantic matching over keyword scoring,
  // how the explanation is produced, what stops a confident-but-wrong ranking.
  keyDecisions: [
    "[PLACEHOLDER] A decision, the alternative you rejected, and why.",
    "[PLACEHOLDER] A second decision.",
  ],
};
