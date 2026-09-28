import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Backdrop } from "@/components/layout/Backdrop";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { navItems } from "@/content/published";
import { SITE_CONTENT } from "@/content/site";
import { SITE } from "@/lib/constants";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

/*
 * Two families, two weights. Loading only 400 and 500 enforces the weight rule
 * at the font level — a stray font-bold has nothing to resolve to.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE_CONTENT.metaDescription,
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE_CONTENT.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE_CONTENT.metaDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Sets data-theme before first paint so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Keyboard users would otherwise tab through every nav link on every
            page before reaching the content. Visible only when focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-text"
        >
          Skip to content
        </a>

        <Backdrop />
        <SiteHeader {...navItems()} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
