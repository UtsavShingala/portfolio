# utsavshingala.com

Personal site — Next.js (App Router) + TypeScript + Tailwind v4. Statically
generated, no database, no API routes.

Every section is its own page, so each one gets its own URL, title and
description:

```
/                                     hero + contact
/experience  /projects  /architecture one page per registry entry,
/product  /blogs  /achievements       generated from content/sections.ts
/leadership
/projects/<slug>                      project detail pages
```

The blog lives at `/blogs` on this domain rather than a `blogs.` subdomain:
Google treats subdomains as separate sites, so posts on a subdirectory build
authority for the main domain instead of splitting it.

```bash
npm run dev     # http://localhost:3000
npm run build   # prerenders every page
npm run lint
```

## Editing content

**All content lives in `/content`. You should never need to touch `/components`
to change what the site says.**

| Section | File |
| --- | --- |
| Hero, about, closing CTA | `content/site.ts` |
| Profile cards (GitHub / LinkedIn / X) | `content/profiles.ts` |
| Experience | `content/experience.ts` |
| Projects | `content/projects/` — one file per project |
| Architecture patterns | `content/architecture.ts` |
| Product decisions | `content/product.ts` |
| Blog | `content/blogs/index.ts` |
| Achievements | `content/achievements.ts` |
| Leadership | `content/leadership.ts` |
| Links and email | `lib/constants.ts` |

### Adding a project

1. Create `content/projects/<slug>.ts`, exporting a `Project`.
2. Import it in `content/projects/index.ts` and add it to the array.

The home page card, the `/projects` index entry and the static
`/projects/<slug>` route all follow automatically.

### Adding a whole new section

1. Add an entry to `content/sections.ts` — position in that array decides the
   nav order, the `01 —` number and the URL.
2. Create the section component under `components/sections/`.
3. Map it in `SECTION_VIEWS` in `app/[section]/page.tsx`.

There is no route file to create: `/<id>` is generated from the registry.
Everything below it renumbers itself and the nav updates. Skipping step 3 fails
the build on purpose, so a nav item can never point at a page that doesn't
render.

## Design rules

Encoded in `app/globals.css` — change tokens there, never a hex in a component.

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#0A0A0B` | page background |
| `--color-card` | `#141416` | raised surfaces |
| `--color-border` | `#232326` | 1px hairlines |
| `--color-text` | `#EDEDEF` | primary text |
| `--color-muted` | `#8A8A93` | secondary text |
| `--color-accent` | `#4ADE80` | terminal green |
| `--color-grid` | `#17171A` | faint backdrop grid |

Dark is the default. `data-theme="light"` on `<html>` swaps the raw values in
`:root[data-theme="light"]`; the Tailwind utilities read them through `var()`,
so no component changes. The light accent is a different hex (`#15803D`) on
purpose — `#4ADE80` sits near 1.7:1 on a near-white background and fails
contrast for the small text it is used on.

- **Two families.** Inter for headings/body/nav, JetBrains Mono for section
  numbers, tech tags, the `~/utsav` wordmark and small labels. Never mono for
  body text, never sans for a tech tag.
- **Two weights**, 400 and 500. Only those are loaded, so `font-bold` has
  nothing to resolve to.
- **Each section has its own hue.** `accent` in `content/sections.ts` picks one
  of green / blue / violet / amber / cyan / rose; the section wrapper sets
  `data-accent`, which resolves `--section-accent` for its number and backdrop
  glow. Components never name a colour — add a section and it inherits the
  system. Every hue has a darkened light-mode value, because the dark-mode
  values sit near 1.5–2:1 on near-white and fail contrast for small text.
- **Colour stays sparse per screen** — the section number, the glow, tech-stack
  lines, link hover, one CTA. Never on headings, never on borders.
- **Sections are separated by a hairline plus whitespace**, not a card. Cards are
  only for project tiles and expandable rows.
- **No animation** beyond link/card hover and the expand transition. Both are
  disabled under `prefers-reduced-motion`.
- **No terminal flourishes.** The wordmark is the plain name and the `$ whoami`
  line is gone; mono is for section numbers, tech tags and small labels only.
- `localStorage` is used in exactly one place — a single `theme` key holding
  `"light"` or `"dark"`. Nothing else is persisted, and `sessionStorage` is
  unused. A cookie was the alternative, but reading cookies server-side turns
  every route dynamic and would cost static generation across the site.

## Still to supply

Content is all `[PLACEHOLDER]` right now — search the repo for that string to
find everything that needs replacing. Beyond the text:

- [ ] `public/avatar.svg` — replace the placeholder glyph with a real photo
      (update `ASSETS.avatar` in `lib/constants.ts` if the extension changes).
- [ ] Real URLs in `lib/constants.ts` — GitHub, LinkedIn, Twitter, email.
- [ ] Real repo/demo URLs in each `content/projects/*.ts` (all `#` today).
- [ ] Architecture diagrams in `public/diagrams/`, then set `diagram` on each
      pattern in `content/architecture.ts`. Cards show a dashed placeholder slot
      until then.
- [ ] `public/og/default.png` for link previews.
- [ ] Delete the two `[PLACEHOLDER ROLE — DELETE THIS ENTRY]` objects in
      `content/experience.ts` and `content/leadership.ts` — they exist only to
      show the spacing between two entries.

Keep company names, real code, internal schemas and client data off the site.
Architecture patterns are described generically for that reason.
