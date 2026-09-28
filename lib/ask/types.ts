/**
 * Shapes shared by the indexer (build time) and the retriever (request time).
 *
 * `version` exists so a chunks.json written by an older indexer fails loudly
 * instead of being read with the wrong field names.
 */

export const INDEX_VERSION = 1;

export interface Chunk {
  /** Stable id — `${section}:${slug}`. Rebuilding must not renumber these. */
  id: string;
  section: string;
  title: string;
  /** Route this chunk can be cited as. Empty when nothing on the site shows it. */
  href: string;
  text: string;
}

export interface IndexedChunk extends Chunk {
  /** Term -> count within this chunk. */
  terms: Record<string, number>;
  /** Token count, for BM25 length normalisation. */
  length: number;
}

export interface AskIndex {
  version: number;
  builtFrom: { content: number; curated: number };
  chunks: IndexedChunk[];
  stats: {
    count: number;
    averageLength: number;
    /** Term -> number of chunks containing it. */
    documentFrequency: Record<string, number>;
  };
}
