/**
 * The retrieval engine.
 *
 * BM25 over the prebuilt index. No embeddings, no vector store, no second
 * vendor — the corpus is a few dozen chunks of prose that already uses the
 * vocabulary people will search with.
 *
 * Its main job is not ranking. It is the **gate**: deciding whether a question
 * touches this site at all. A question that scores below the threshold is
 * answered with an explicit "not covered here" and never reaches the model —
 * which is simultaneously the hallucination guard, the prompt-injection guard,
 * and the cost guard.
 *
 * Swapping in embeddings later is a change inside this file and nothing else.
 */

import { tokenize } from "./tokenize";
import type { AskIndex, IndexedChunk } from "./types";

/** Standard BM25 constants; k1 damps term repetition, b controls length bias. */
const K1 = 1.5;
const B = 0.75;

/**
 * Minimum score for a question to count as on-topic.
 *
 * Tuned empirically against the eval set — raise it and real questions get
 * refused, lower it and off-topic questions reach the model. It is the single
 * most important number in this feature, so it is named, not inlined.
 */
export const RELEVANCE_THRESHOLD = 2.5;

/** How many chunks are handed to the model when the gate passes. */
export const TOP_K = 5;

export interface Match {
  chunk: IndexedChunk;
  score: number;
}

export interface RetrievalResult {
  matches: Match[];
  topScore: number;
  /** False means: answer "not covered here" without calling a model. */
  onTopic: boolean;
}

function score(term: string, chunk: IndexedChunk, index: AskIndex): number {
  const frequency = chunk.terms[term];
  if (!frequency) return 0;

  const { count, averageLength, documentFrequency } = index.stats;
  const seenIn = documentFrequency[term] ?? 0;

  // Inverse document frequency: a term in every chunk tells you nothing, a
  // term in one chunk tells you a lot. The +0.5/+1 smoothing keeps it positive
  // for terms that appear in more than half the corpus.
  const idf = Math.log(1 + (count - seenIn + 0.5) / (seenIn + 0.5));

  const normalised =
    frequency * (K1 + 1) /
    (frequency + K1 * (1 - B + (B * chunk.length) / averageLength));

  return idf * normalised;
}

export function retrieve(question: string, index: AskIndex): RetrievalResult {
  const terms = tokenize(question);

  if (terms.length === 0) {
    return { matches: [], topScore: 0, onTopic: false };
  }

  const scored: Match[] = index.chunks
    .map((chunk) => ({
      chunk,
      score: terms.reduce((sum, term) => sum + score(term, chunk, index), 0),
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);

  const topScore = scored[0]?.score ?? 0;

  return {
    matches: scored.slice(0, TOP_K),
    topScore,
    onTopic: topScore >= RELEVANCE_THRESHOLD,
  };
}
