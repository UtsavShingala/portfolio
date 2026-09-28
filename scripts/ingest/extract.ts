/**
 * Stage 1 — extraction.
 *
 *   knowledge/sources/  ->  knowledge/staging/
 *
 * Turns whatever you dropped in `sources/` into plain text you can read and
 * edit. It writes to `staging/` and stops there on purpose: nothing reaches the
 * site until a person has read it and written the safe parts into
 * `knowledge/curated/`. That review step is the whole point of the pipeline.
 *
 *   npm run ingest:extract
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const SOURCES = path.join(process.cwd(), "knowledge", "sources");
const STAGING = path.join(process.cwd(), "knowledge", "staging");

/**
 * Pulls text out of a PDF without a parsing library.
 *
 * A PDF stores page content in compressed streams; the text sits inside
 * parenthesised strings next to the operators that draw it. Inflating every
 * stream and collecting those strings is crude but dependency-free, and good
 * enough for documents whose text is real text.
 *
 * It cannot read scanned pages — those are images and need OCR. If a file comes
 * out near-empty, that is why; retype it by hand.
 */
function extractPdf(buffer: Buffer): string {
  const pages: string[] = [];
  let cursor = 0;

  for (;;) {
    const start = buffer.indexOf("stream", cursor);
    if (start === -1) break;

    let from = start + "stream".length;
    if (buffer[from] === 0x0d) from++;
    if (buffer[from] === 0x0a) from++;

    const end = buffer.indexOf("endstream", from);
    if (end === -1) break;
    cursor = end + "endstream".length;

    let inflated: string;
    try {
      inflated = zlib.inflateSync(buffer.subarray(from, end)).toString("latin1");
    } catch {
      continue; // not a deflate stream — images, fonts, metadata
    }
    if (!/\b(TJ|Tj)\b/.test(inflated)) continue;

    let text = "";
    const tokens =
      /\((?:\\.|[^\\()])*\)|\bTJ\b|\bTj\b|\bTD\b|\bTd\b|\bT\*\b|\bET\b/g;
    let match: RegExpExecArray | null;

    while ((match = tokens.exec(inflated))) {
      const token = match[0];
      if (token.startsWith("(")) {
        text += token
          .slice(1, -1)
          .replace(/\\([()\\])/g, "$1")
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, "")
          .replace(/\\t/g, " ");
      } else {
        text += "\n"; // TD/Td/T*/ET all end a run of glyphs
      }
    }

    const cleaned = text.replace(/\n{3,}/g, "\n\n").trim();
    if (cleaned.length > 40) pages.push(cleaned);
  }

  return pages.join("\n\n---- page ----\n\n");
}

function extract(file: string): string | null {
  const ext = path.extname(file).toLowerCase();
  const full = path.join(SOURCES, file);

  if (ext === ".pdf") return extractPdf(fs.readFileSync(full));
  if (ext === ".txt" || ext === ".md") return fs.readFileSync(full, "utf8");
  return null;
}

function main(): void {
  fs.mkdirSync(STAGING, { recursive: true });

  const files = fs
    .readdirSync(SOURCES)
    .filter((name) => !name.startsWith(".") && name !== "README.md");

  if (files.length === 0) {
    console.log("knowledge/sources/ is empty — drop a PDF, .txt or .md in it.");
    return;
  }

  let written = 0;

  for (const file of files) {
    const text = extract(file);

    if (text === null) {
      console.log(`skip  ${file}  (unsupported type)`);
      continue;
    }
    if (text.trim().length < 40) {
      console.log(`empty ${file}  (scanned PDF? needs OCR, or retype by hand)`);
      continue;
    }

    const out = `${path.basename(file, path.extname(file))}.txt`;
    fs.writeFileSync(path.join(STAGING, out), text, "utf8");
    written++;
    console.log(`ok    ${file}  ->  staging/${out}  (${text.length} chars)`);
  }

  if (written > 0) {
    console.log(
      `\n${written} file(s) extracted.\n` +
        `Next: read them, and write only the publishable parts into\n` +
        `knowledge/curated/ as markdown. Nothing is indexed until you do.`,
    );
  }
}

main();
