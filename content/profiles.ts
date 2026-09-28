import type { Profile } from "./types";
import { LINKS } from "@/lib/constants";

/**
 * Profile preview cards on the home page.
 *
 * These are static — nothing is fetched from GitHub, LinkedIn or X at runtime,
 * which keeps the site fully prerendered and free of third-party scripts. The
 * tradeoff is that the lines below are yours to keep in sync.
 *
 * A card whose href is empty is skipped, so an unset handle never renders.
 */
export const PROFILES: Profile[] = [
  {
    id: "github",
    accent: "green",
    platform: "GitHub",
    handle: "@UtsavShingala",
    href: LINKS.github,
    // Verbatim from the GitHub profile bio.
    bio: "Software Development | Full Stack",
    meta: "Junagadh, Gujarat, India",
    // The real GitHub avatar, pulled from the public profile.
    avatar: "/profiles/github.jpg",
  },
  {
    id: "linkedin",
    accent: "blue",
    platform: "LinkedIn",
    handle: "in/utsav-shingala-7924121ab",
    href: LINKS.linkedin,
    // Your LinkedIn headline with the employer dropped — the live headline
    // reads "AI Software Engineer @<company> | ...", and company names stay off
    // this site. The contest list is also dropped: it lives in Achievements.
    bio: "AI Software Engineer | Distributed Systems · Order Matching Engines · LLM-RAG Pipelines",
    // No meta line: the employer can't be named, and a college would read as a
    // student profile. The card stands fine on the headline alone.
    // [PLACEHOLDER] save your LinkedIn photo as public/profiles/linkedin.jpg
    // and set: avatar: "/profiles/linkedin.jpg"
  },
  {
    id: "twitter",
    accent: "cyan",
    platform: "X",
    handle: "@UtsavShingala25",
    href: LINKS.twitter,
    // [PLACEHOLDER] X returns HTTP 402 to unauthenticated readers, so this
    // could not be filled from the live profile. Paste your bio here.
    bio: "[PLACEHOLDER] What you post about.",
    // [PLACEHOLDER] save your X photo as public/profiles/x.jpg
    // and set: avatar: "/profiles/x.jpg"
  },
];
