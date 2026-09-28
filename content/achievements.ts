import type { Achievement } from "./types";

/**
 * One row each: label left, mono value right.
 *
 * Add `href` wherever the result can be checked — a leaderboard, a public
 * profile, a results page. Rows with one become clickable and show an external
 * arrow; rows without stay plain text, so a mixed list still looks right.
 */
export const ACHIEVEMENTS: Achievement[] = [
  {
    label: "iRage AlgoArena 2026 · quant finance & trading challenge",
    value: "Finalist",
    // [PLACEHOLDER] add a results or leaderboard URL if one is public
  },
  { label: "Meta Hacker Cup 2025", value: "7,278 / 13,779" },
  { label: "IICPC", value: "~4,067 / 13,000+" },
  { label: "CodeSignal GCA", value: "416 / 600" },
  { label: "JEE Advanced 2022", value: "AIR 15,123" },
  { label: "McKinsey Forward Program", value: "2025" },
  { label: "Rajya Puraskar · Scouts & Guides", value: "State award" },
];
