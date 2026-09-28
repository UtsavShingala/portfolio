# knowledge/

Everything the "ask anything" assistant is allowed to know.

Four stages, one direction. A document moves left to right and never skips a
box.

```
sources/  ──▶  staging/  ──▶  curated/  ──▶  index/
 raw docs      extracted      reviewed by      built
 (ignored)     text           a human          artifact
               (ignored)      (committed)      (committed)
```

## The stages

| Folder | Committed | Written by | Holds |
| --- | --- | --- | --- |
| `sources/` | no | you, by hand | raw PDFs, DOCX, notes — dropped in as-is |
| `staging/` | no | `scripts/ingest/extract.ts` | machine-extracted plain text, unreviewed |
| `curated/` | **yes** | you, by hand | sanitised markdown — knowledge that has no page |
| `index/` | **yes** | `scripts/ingest/build-index.ts` | chunked, searchable JSON |

### Why two folders are gitignored

`sources/` and `staging/` hold material that has not been reviewed for what is
safe to publish. Committing them would push unreviewed content into a public
repository — which is the exact failure the curation step exists to prevent.

Nothing reaches the site until a person has read it and written it into
`curated/`. That gate is the entire point of this pipeline; automation stops at
`staging/`.

### What may go in sources/

- Own or public work — personal projects, college events, published writing
- Notes, drafts, résumés

**Never**: employer work product, internal documents, client material. Not the
originals, not extracts, not paraphrases that carry internal detail. See
`docs/ask-feature.md` § 9.

The reduction from a source document to a publishable fact is a judgement call,
and it is the one step that cannot be automated. A twenty-page report usually
yields one publishable paragraph.

## curated/ is not a copy of the site

`content/*.ts` already holds every fact shown on a page, and the indexer reads
it directly. Restating a project card here would create two sources of truth
for one claim, and they drift the moment one is edited and the other is not.

So `curated/` holds only what has **no page**: background, reasoning too long
for a card, answers to questions the site has no section for.

A curated file that repeats a project card is a bug.

## curated/ file format

One file per topic. Frontmatter carries the metadata that becomes chunk
metadata; the body is prose the assistant can quote.

```markdown
---
id: order-matching-engine
section: projects
title: Low-Latency Order-Matching Engine
href: /projects/order-matching-engine
---

A simulation of an exchange core — a central limit order book with
price-time (FIFO) matching.

Key decisions: O(log N) operations via a sorted structure plus deques;
strict price-time priority.
```

`href` matters: it is what the assistant cites, so a reader can open the page
and check the claim. A curated file with no `href` can still be indexed, but its
answers will carry no source link.

Start from `curated/_TEMPLATE.md`.

## Running the pipeline

```bash
npm run ingest:extract      # sources/ -> staging/    (then review by hand)
npm run ingest:build        # curated/ -> index/
```

Neither script is deployed. Both run locally; only their reviewed output is
committed.
