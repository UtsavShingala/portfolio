/**
 * Stage 2 — chunking.
 *
 * Turns both corpora into retrievable units:
 *
 *   content/*.ts            everything already visible on a page
 *   knowledge/curated/*.md  knowledge that has no page
 *
 * Chunks are split on semantic boundaries — a heading, a project, a pattern —
 * rather than a fixed character window. The corpus is small and already
 * topic-shaped, so a sliding window would only cut sentences in half for no gain.
 *
 * Every chunk carries an `href`, because an answer that cannot be checked
 * against a real page is worth very little.
 */

import fs from "node:fs";
import path from "node:path";

import { PROJECTS } from "../../content/projects";
import { ARCHITECTURE_PATTERNS } from "../../content/architecture";
import { PRODUCT_DECISIONS } from "../../content/product";
import { PRODUCTS } from "../../content/products";
import { EXPERIENCE } from "../../content/experience";
import { LEADERSHIP } from "../../content/leadership";
import { ACHIEVEMENTS } from "../../content/achievements";
import { SITE_CONTENT } from "../../content/site";

import type { Chunk } from "../../lib/ask/types";

const CURATED = path.join(process.cwd(), "knowledge", "curated");

/** Drops entries still holding scaffold filler, so placeholders are never indexed. */
function isPlaceholder(text: string): boolean {
  return text.includes("[PLACEHOLDER]");
}

function push(chunks: Chunk[], chunk: Chunk): void {
  const text = chunk.text.replace(/\s+/g, " ").trim();
  if (text.length < 40 || isPlaceholder(text)) return;
  chunks.push({ ...chunk, text });
}

/** Site content — the typed arrays that already render as pages. */
function fromContent(): Chunk[] {
  const chunks: Chunk[] = [];

  push(chunks, {
    id: "about:hero",
    section: "about",
    title: "About",
    href: "/",
    text: `${SITE_CONTENT.hero.tagline} ${SITE_CONTENT.hero.about}`,
  });

  for (const product of PRODUCTS) {
    push(chunks, {
      id: `products:${product.slug}`,
      section: "products",
      title: product.name,
      href: `/products/${product.slug}`,
      text: [
        product.summary,
        ...product.overview,
        `Stack: ${product.stack.join(", ")}.`,
        ...product.keyDecisions,
        ...(product.metrics ?? []).map((m) => `${m.label}: ${m.value}.`),
      ].join(" "),
    });
  }

  for (const project of PROJECTS) {
    push(chunks, {
      id: `projects:${project.slug}`,
      section: "projects",
      title: project.title,
      href: `/projects/${project.slug}`,
      text: [
        project.summary,
        project.overview,
        `Stack: ${project.stack.join(", ")}.`,
        ...project.keyDecisions,
        ...(project.metrics ?? []).map((m) => `${m.label}: ${m.value}.`),
      ].join(" "),
    });
  }

  for (const pattern of ARCHITECTURE_PATTERNS) {
    push(chunks, {
      id: `architecture:${pattern.slug}`,
      section: "architecture",
      title: pattern.title,
      href: `/architecture/${pattern.slug}`,
      text: [
        pattern.summary,
        pattern.flow ? `Flow: ${pattern.flow}.` : "",
        pattern.description,
        ...pattern.decisions,
      ].join(" "),
    });
  }

  for (const decision of PRODUCT_DECISIONS) {
    push(chunks, {
      id: `decisions:${decision.slug}`,
      section: "decisions",
      title: decision.title,
      href: `/decisions/${decision.slug}`,
      text: [
        decision.summary,
        `Problem: ${decision.problem}`,
        `Options: ${decision.options}`,
        `Choice: ${decision.choice}`,
        `Tradeoff: ${decision.tradeoff}`,
        ...(decision.detail ?? []).flatMap((d) => [d.heading, ...d.body]),
      ].join(" "),
    });
  }

  for (const role of EXPERIENCE) {
    push(chunks, {
      id: `experience:${role.id}`,
      section: "experience",
      title: role.role,
      href: "/experience",
      text: [
        `${role.role}${role.context ? `, ${role.context}` : ""}, ${role.period}.`,
        ...role.bullets,
      ].join(" "),
    });
  }

  for (const entry of LEADERSHIP) {
    push(chunks, {
      id: `leadership:${entry.id}`,
      section: "leadership",
      title: `${entry.role}, ${entry.org}`,
      href: "/leadership",
      text: `${entry.role} at ${entry.org} (${entry.period}). ${entry.points.join(" ")}`,
    });
  }

  // Achievements are one-liners; a chunk each would be noise in retrieval.
  push(chunks, {
    id: "achievements:all",
    section: "achievements",
    title: "Achievements",
    href: "/achievements",
    text: ACHIEVEMENTS.map((a) => `${a.label}: ${a.value}.`).join(" "),
  });

  return chunks;
}

/** Curated markdown — knowledge with no page. One chunk per `##` section. */
function fromCurated(): Chunk[] {
  if (!fs.existsSync(CURATED)) return [];

  const chunks: Chunk[] = [];
  const files = fs
    .readdirSync(CURATED)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md");

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CURATED, file), "utf8");
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);

    if (!match) {
      console.warn(`skip  curated/${file} — no frontmatter`);
      continue;
    }

    const meta: Record<string, string> = {};
    for (const line of match[1].split(/\r?\n/)) {
      const kv = /^([a-zA-Z]+):\s*(.*)$/.exec(line.trim());
      if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
    }

    const id = meta.id ?? path.basename(file, ".md");
    const section = meta.section ?? "about";
    const body = match[2];

    // Split on `##` headings; body before the first heading is its own chunk.
    const parts = body.split(/^##\s+(.+)$/m);
    const lead = parts[0];

    push(chunks, {
      id: `${section}:${id}`,
      section,
      title: meta.title ?? id,
      href: meta.href ?? "",
      text: lead,
    });

    for (let i = 1; i < parts.length; i += 2) {
      push(chunks, {
        id: `${section}:${id}#${parts[i].toLowerCase().replace(/\W+/g, "-")}`,
        section,
        title: `${meta.title ?? id} — ${parts[i]}`,
        href: meta.href ?? "",
        text: parts[i + 1] ?? "",
      });
    }
  }

  return chunks;
}

export function buildChunks(): Chunk[] {
  return [...fromContent(), ...fromCurated()];
}
