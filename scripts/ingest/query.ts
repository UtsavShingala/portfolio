/**
 * Retrieval smoke test — no model, no API key, no cost.
 *
 *   npm run ask:query "does he know low latency systems"
 *   npm run ask:query "does he know kubernetes"
 *
 * Prints the gate decision and the chunks that would be sent to the model.
 * The second example should be refused: if it is not, the threshold in
 * lib/ask/retrieve.ts is too low.
 *
 * This is also the harness the eval runs on — every question whose expected
 * outcome is "refuse" can be checked here before a model is ever involved.
 */

import fs from "node:fs";
import path from "node:path";

import { retrieve, RELEVANCE_THRESHOLD } from "../../lib/ask/retrieve";
import { INDEX_VERSION, type AskIndex } from "../../lib/ask/types";

const INDEX_FILE = path.join(process.cwd(), "knowledge", "index", "chunks.json");

function main(): void {
  const question = process.argv.slice(2).join(" ").trim();

  if (!question) {
    console.error('Usage: npm run ask:query "your question here"');
    process.exit(1);
  }

  if (!fs.existsSync(INDEX_FILE)) {
    console.error("No index found. Run `npm run ingest:build` first.");
    process.exit(1);
  }

  const index: AskIndex = JSON.parse(fs.readFileSync(INDEX_FILE, "utf8"));

  if (index.version !== INDEX_VERSION) {
    console.error(
      `Index is version ${index.version}, this code expects ${INDEX_VERSION}. Rebuild it.`,
    );
    process.exit(1);
  }

  const result = retrieve(question, index);

  console.log(`\nQ  ${question}`);
  console.log(
    `   top score ${result.topScore.toFixed(2)}  ·  threshold ${RELEVANCE_THRESHOLD}`,
  );

  if (!result.onTopic) {
    console.log(`\n   REFUSED — no model call.`);
    console.log(`   "That isn't something this site covers."\n`);
    return;
  }

  console.log(`\n   PASSED — ${result.matches.length} chunk(s) to the model:\n`);

  for (const { chunk, score } of result.matches) {
    const where = chunk.href || "(no page)";
    console.log(`   ${score.toFixed(2).padStart(6)}  ${chunk.title}`);
    console.log(`           ${where}`);
    console.log(`           ${chunk.text.slice(0, 110)}...\n`);
  }
}

main();
