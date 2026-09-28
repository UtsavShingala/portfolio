import type { MetadataRoute } from "next";
import { SECTIONS } from "@/content/sections";
import { PUBLISHED } from "@/content/published";
import { SITE } from "@/lib/constants";

/**
 * Generated from the content files, so it can't fall out of date: add a
 * section, project or pattern and its URL appears here on the next build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;

  return [
    { url: url("/"), priority: 1 },
    ...SECTIONS.map((section) => ({
      url: url(`/${section.id}`),
      priority: 0.8,
    })),
    ...PUBLISHED.products.map((product) => ({
      url: url(`/products/${product.slug}`),
      priority: 0.7,
    })),
    ...PUBLISHED.projects.map((project) => ({
      url: url(`/projects/${project.slug}`),
      priority: 0.7,
    })),
    ...PUBLISHED.patterns.map((pattern) => ({
      url: url(`/architecture/${pattern.slug}`),
      priority: 0.6,
    })),
    ...PUBLISHED.decisions.map((decision) => ({
      url: url(`/decisions/${decision.slug}`),
      priority: 0.6,
    })),
  ];
}
