export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

/**
 * Runs before first paint, so the page never flashes the wrong theme.
 *
 * This is the one place the site touches localStorage — it stores a single
 * "light" | "dark" string and nothing else. A cookie would be the alternative,
 * but reading cookies server-side opts every route into dynamic rendering and
 * would cost us static generation across the whole site.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`.trim();
