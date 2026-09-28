import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

/**
 * Generated at build time, so every link share gets a branded preview instead
 * of a bare title. Uses the site's own tokens, hardcoded here because
 * ImageResponse renders outside the page's CSS.
 */
export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#0A0A0B",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: "#4ADE80",
            fontFamily: "monospace",
          }}
        >
          {SITE.domain}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 104,
            color: "#EDEDEF",
            letterSpacing: -3,
          }}
        >
          {SITE.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 40,
            color: "#8A8A93",
          }}
        >
          {SITE.role}
        </div>
      </div>
    ),
    size,
  );
}
