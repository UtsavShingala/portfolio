# scripts/ingest/

Local-only pipeline scripts. Never deployed, never called at runtime.

| File | Stage | In | Out |
| --- | --- | --- | --- |
| `extract.ts` | extraction | `knowledge/sources/` | `knowledge/staging/` |
| `chunk.ts` | chunking | `content/*.ts` + `knowledge/curated/` | in-memory chunks |
| `build-index.ts` | indexing | `content/*.ts` + `knowledge/curated/` | `knowledge/index/chunks.json` |

## extract.ts

Turns binary documents into plain text so they can be read and edited.

Writes one `.txt` per source into `staging/`, then stops. It deliberately does
not write to `curated/` — a human does that, and that is the review gate.

PDF text extraction can be done with a dependency-free zlib pass over the
content streams, or a library if the PDFs are complex. Scanned/image PDFs need
OCR and are out of scope; retype those by hand.

## chunk.ts

Splits both corpora into retrievable units — the typed site content in
`content/*.ts` and the extra markdown in `knowledge/curated/`. Site entries
carry their own route as `href`; curated files take it from frontmatter.

- One chunk per heading section, not a fixed character window — the corpus is
  small and already topic-shaped, so semantic boundaries beat a sliding window.
- Every chunk carries `id`, `section`, `title` and `href`. `href` is what makes
  a citation clickable.
- Target a few hundred tokens per chunk. Merge anything shorter into its
  neighbour rather than emitting a fragment.

## build-index.ts

Writes `knowledge/index/chunks.json` — the artifact the API route reads.

Committed rather than built on deploy, so the build needs no API key and stays
deterministic. The tradeoff is that it can go stale: re-run after every change
to `content/*.ts` or `curated/`.
