/**
 * Stage 3 — indexing.
 *
 *   content/*.ts + knowledge/curated/*.md  ->  knowledge/index/chunks.json
 *
 * Writes the artifact the API route reads. Committed rather than built on
 * deploy, so the build needs no API key and stays deterministic — the tradeoff
 * is that it goes stale, so re-run after editing content or curated files.
 *
 * Corpus statistics (document frequency, average length) are computed here so
 * retrieval at request time is a scan over precomputed numbers rather than a
 * pass over the whole corpus.
 *
 *   npm run ingest:build
 */

import fs from "node:fs";
import path from "node:path";

import { buildChunks } from "./chunk";
import { tokenize } from "../../lib/ask/tokenize";
import { INDEX_VERSION, type AskIndex, type IndexedChunk } from "../../lib/ask/types";

const OUT_DIR = path.join(process.cwd(), "knowledge", "index");
const OUT_FILE = path.join(OUT_DIR, "chunks.json");

function main(): void {
  const chunks = buildChunks();

  if (chunks.length === 0) {
    console.error(
      "No chunks produced. Every content entry is still a [PLACEHOLDER],\n" +
        "and placeholders are deliberately excluded from the index.",
    );
    process.exit(1);
  }

  const documentFrequency: Record<string, number> = {};
  let totalLength = 0;

  const indexed: IndexedChunk[] = chunks.map((chunk) => {
    const tokens = tokenize(`${chunk.title} ${chunk.text}`);
    const terms: Record<string, number> = {};

    for (const token of tokens) terms[token] = (terms[token] ?? 0) + 1;
    for (const term of Object.keys(terms)) {
      documentFrequency[term] = (documentFrequency[term] ?? 0) + 1;
    }

    totalLength += tokens.length;
    return { ...chunk, terms, length: tokens.length };
  });

  const index: AskIndex = {
    version: INDEX_VERSION,
    builtFrom: {
      content: chunks.filter((c) => c.href !== "").length,
      curated: chunks.filter((c) => c.href === "").length,
    },
    chunks: indexed,
    stats: {
      count: indexed.length,
      averageLength: totalLength / indexed.length,
      documentFrequency,
    },
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(index, null, 2)}\n`, "utf8");

  const bytes = fs.statSync(OUT_FILE).size;
  console.log(
    `${indexed.length} chunks -> knowledge/index/chunks.json (${(bytes / 1024).toFixed(1)} KB)`,
  );

  const bySection = indexed.reduce<Record<string, number>>((acc, c) => {
    acc[c.section] = (acc[c.section] ?? 0) + 1;
    return acc;
  }, {});

  for (const [section, n] of Object.entries(bySection).sort()) {
    console.log(`  ${section.padEnd(14)} ${n}`);
  }

  const orphans = indexed.filter((c) => c.href === "").length;
  if (orphans > 0) {
    console.log(
      `\n${orphans} chunk(s) have no href — their answers will carry no source link.`,
    );
  }
}

main();
