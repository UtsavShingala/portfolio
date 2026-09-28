# curated/

Hand-written, reviewed knowledge that has **no page on the site**.

Facts already visible on a page live in `content/*.ts` and are indexed from
there directly — do not restate them here. This folder is for background,
reasoning that did not fit on a card, and answers to questions the site has no
section for.

One file per topic. Copy `_TEMPLATE.md` to start.

`section` should match a section id from `content/sections.ts` where one
applies — `products`, `experience`, `projects`, `architecture`, `decisions`,
`achievements`, `leadership`, `blogs` — so answers can be grouped and linked
back to a real page. Use `about` for hero/bio material that has no section.

Files beginning with `_` are ignored by the indexer.
