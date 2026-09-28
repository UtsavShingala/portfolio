import type { BlogPost } from "../types";

/**
 * Post metadata. Bodies are not here yet — when the first real post exists,
 * MDX gets wired into a /blogs/[slug] route and the body lives beside this
 * file. Until then every post stays "coming-soon" and renders unlinked.
 *
 * Do not flip a post to "published" before that route exists, or its link 404s.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "post-one",
    title: "[PLACEHOLDER] First post title",
    summary: "[PLACEHOLDER] One line on what the reader gets out of this.",
    status: "coming-soon",
  },
  {
    slug: "post-two",
    title: "[PLACEHOLDER] Second post title",
    summary: "[PLACEHOLDER] One line on what the reader gets out of this.",
    status: "coming-soon",
  },
  {
    slug: "post-three",
    title: "[PLACEHOLDER] Third post title",
    summary: "[PLACEHOLDER] One line on what the reader gets out of this.",
    status: "coming-soon",
  },
  {
    slug: "post-four",
    title: "[PLACEHOLDER] Fourth post title",
    summary: "[PLACEHOLDER] One line on what the reader gets out of this.",
    status: "coming-soon",
  },
];
