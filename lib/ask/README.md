# lib/ask/

Runtime code for the assistant. Imported by `app/api/ask/route.ts`.

| File | Responsibility |
| --- | --- |
| `provider.ts` | The only place an LLM is called. One function, one signature. |
| `corpus.ts` | Loads `knowledge/index/chunks.json`. |
| `retrieve.ts` | Scores a question against the chunks, returns matches + top score. |
| `guard.ts` | Length cap, rate limit, retrieval threshold. |
| `prompt.ts` | The grounded system prompt and the refusal wording. |

## Retrieval without an embeddings provider

Anthropic does not offer an embeddings endpoint, so semantic search would mean
adding a second vendor, a second key and a second bill.

At this corpus size that is not worth it. Start with lexical scoring — BM25 or
similar over the chunks — which runs locally, costs nothing, needs no key, and
is enough to answer the only question the gate actually asks: *does this
question touch anything on this site at all?*

If the gate later proves too blunt, adding embeddings is a change inside
`retrieve.ts` and nothing else. That is why it is its own module.

## Retrieval gate, then full context

The gate decides **whether** to answer. The answer itself is generated from the
whole corpus, not just the top chunks — it is only a few thousand tokens, and
the model reading everything beats it reading three fragments.

Prompt caching makes this cheap: the corpus is byte-identical on every request,
so it caches and subsequent calls read it at a fraction of the input rate.
Keep the corpus first in the prompt and the question last, or the cache breaks.

## provider.ts

Everything model-specific lives here so it can be swapped in one file — which
is also what makes an eval across several models cheap to run.

Uses the official SDK (`@anthropic-ai/sdk`), never raw fetch.
