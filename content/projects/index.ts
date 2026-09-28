import type { Project } from "../types";
import { orderMatchingEngine } from "./order-matching-engine";
import { investmentCopilot } from "./investment-copilot";
import { documentExtraction } from "./document-extraction";
import { candidateRanking } from "./candidate-ranking";
import { ragAssistant } from "./rag-assistant";

/**
 * To add a project: create a file in this directory and add it to the array.
 * Card order, the /projects index and the static routes for
 * /projects/[slug] all follow from here — no component changes needed.
 */
export const PROJECTS: Project[] = [
  orderMatchingEngine,
  investmentCopilot,
  documentExtraction,
  candidateRanking,
  ragAssistant,
].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
