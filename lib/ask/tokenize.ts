/**
 * Shared by the indexer and the retriever.
 *
 * These two MUST tokenize identically. If the index is built with one set of
 * rules and queries are tokenized with another, terms silently fail to match
 * and retrieval quietly returns nothing useful — with no error anywhere.
 * That is why this lives in one file that both import, rather than being
 * written twice.
 */

/**
 * Words carrying no signal for this corpus. Deliberately short: an aggressive
 * stop list removes terms that matter here ("how", "why" and "what" are the
 * shape of every question this thing will be asked).
 */
const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "from",
  "has", "have", "he", "his", "in", "into", "is", "it", "its", "of", "on",
  "or", "she", "that", "the", "their", "then", "there", "they", "this",
  "to", "was", "were", "will", "with", "you", "your",
]);

/**
 * Crude suffix stripping so "matching" finds "match" and "systems" finds
 * "system". Not a real stemmer — a real one needs a dictionary and would be
 * more machinery than a corpus this size can justify.
 */
function stem(word: string): string {
  if (word.length <= 4) return word;
  for (const suffix of ["ingly", "edly", "ing", "ies", "ed", "es", "s"]) {
    if (word.endsWith(suffix) && word.length - suffix.length >= 3) {
      const base = word.slice(0, -suffix.length);
      return suffix === "ies" ? `${base}y` : base;
    }
  }
  return word;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    // Keep intra-word hyphens and dots so "low-latency" and "next.js" survive,
    // then strip them at the edges.
    .split(/[^a-z0-9.\-+#]+/)
    .map((word) => word.replace(/^[.\-]+|[.\-]+$/g, ""))
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word))
    .map(stem);
}
