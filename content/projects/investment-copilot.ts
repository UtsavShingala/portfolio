import type { Project } from "../types";

export const investmentCopilot: Project = {
  slug: "investment-copilot",
  title: "Multi-Agent Investment Co-Pilot",
  summary:
    "A microservice that routes investor queries through specialist agents to monitor, analyse, and protect a portfolio.",
  stack: ["Python", "FastAPI", "LLM APIs", "SSE"],
  links: {
    // [PLACEHOLDER] no public repo found on your GitHub — add the URL when it exists.
    github: "",
    demo: "",
  },
  order: 2,

  overview:
    "A query arrives, a router decides which specialist should handle it, and the answer streams back token by token. The design problem is not the agents themselves but everything around them: keeping unsafe requests away from the model entirely, adding a new specialist without touching the router's internals, and staying useful when the model provider is unavailable.",
  keyDecisions: [
    "A purely local safety guard runs before any model call — sub-millisecond, no tokens spent, and it cannot be prompt-injected because the model never sees the input it rejects.",
    "The agent router is data, not branching logic: adding a specialist is two files and no edits to the dispatch path.",
    "SSE streaming rather than a single response, so the reader sees a first token in under a second instead of waiting for the full answer.",
    "A graceful fallback when the model is unreachable, and a mocked test suite so the pipeline can be tested without spending anything or depending on a provider being up.",
  ],
  metrics: [
    { label: "Safety guard latency", value: "<1ms" },
    { label: "Harmful recall", value: "95%" },
    { label: "First token", value: "<1s" },
    { label: "Cost per query", value: "~$0.002" },
  ],
};
