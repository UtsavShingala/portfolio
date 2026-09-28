import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SECTIONS,
  getSection,
  isSectionId,
  type SectionId,
} from "@/content/sections";
import { SITE_CONTENT } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Architecture } from "@/components/sections/Architecture";
import { Product } from "@/components/sections/Product";
import { Products } from "@/components/sections/Products";
import { Blogs } from "@/components/sections/Blogs";
import { Achievements } from "@/components/sections/Achievements";
import { Leadership } from "@/components/sections/Leadership";

/**
 * One route for every section in the registry — add an entry there and the page
 * exists, with no route file to create.
 *
 * Typing the map as Record<SectionId, ...> makes it exhaustive: register a
 * section without a component here and the build fails, so a nav item can never
 * point at a page that doesn't render.
 */
const SECTION_VIEWS: Record<SectionId, ComponentType> = {
  experience: Experience,
  projects: Projects,
  architecture: Architecture,
  products: Products,
  decisions: Product,
  blogs: Blogs,
  achievements: Achievements,
  leadership: Leadership,
};

/** Every section is prerendered; anything else 404s rather than rendering. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section: section.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[section]">): Promise<Metadata> {
  const { section } = await params;
  if (!isSectionId(section)) return {};

  const meta = getSection(section);
  const intro =
    meta.intro && !isPlaceholder(meta.intro) ? meta.intro : undefined;

  return {
    title: meta.heading,
    description:
      meta.description ?? intro ?? SITE_CONTENT.metaDescription,
  };
}

export default async function SectionPage({
  params,
}: PageProps<"/[section]">) {
  const { section } = await params;
  if (!isSectionId(section)) notFound();

  const View = SECTION_VIEWS[section];

  return <View />;
}
