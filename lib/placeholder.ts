/**
 * Scaffold filler is marked with this token in the content files. Anything that
 * still carries it is unfinished and must never reach a visitor.
 */
const TOKEN = "[PLACEHOLDER]";

export function isPlaceholder(text: string | undefined): boolean {
  return text === undefined || text.includes(TOKEN);
}

/** Drops unfinished lines from a list — a half-written list shows what's done. */
export function withoutPlaceholders(items: readonly string[]): string[] {
  return items.filter((item) => !isPlaceholder(item));
}
