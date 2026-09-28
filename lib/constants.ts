/**
 * Every external link and site-level constant lives here.
 * No URL, email address or asset path should be hardcoded in a component.
 */

export const SITE = {
  name: "Utsav Shingala",
  role: "AI Software Engineer",
  domain: "utsavshingala.com",
  /** Used for metadata, canonical URLs and OG tags. */
  url: "https://utsavshingala.com",
} as const;

/**
 * Leave a value as an empty string and its icon is skipped everywhere —
 * a link is never rendered pointing at nothing.
 */
export const LINKS = {
  github: "https://github.com/UtsavShingala",
  linkedin: "https://www.linkedin.com/in/utsav-shingala-7924121ab/",
  twitter: "https://x.com/UtsavShingala25",
  // Empty = hidden everywhere (contact block, footer icon), so a fake address
  // is never shown to visitors.
  email: "shingalautsav2101@gmail.com",
} as const;

/**
 * Contact form delivery.
 *
 * The site is statically generated with no API routes, so the form posts
 * straight to a third-party endpoint from the browser. Web3Forms is free and
 * needs no account — enter your email at web3forms.com/#start and they mail you
 * an access key. Paste it here.
 *
 * Left empty, the form does not render at all and the contact section falls
 * back to the email button. A form that silently fails is worse than no form.
 */
export const CONTACT_FORM = {
  // [PLACEHOLDER] paste your Web3Forms access key
  accessKey: "",
  endpoint: "https://api.web3forms.com/submit",
} as const;

export const ASSETS = {
  /** Pulled from the public GitHub avatar and stored locally, so the site
   *  doesn't depend on GitHub's CDN. Swap the file to change it everywhere. */
  avatar: "/avatar.jpg",
  /** [PLACEHOLDER] Drop your résumé at public/resume.pdf and set this to
   *  "/resume.pdf". Empty = the download button is not shown. */
  resume: "",
} as const;

export const mailtoHref = `mailto:${LINKS.email}`;
