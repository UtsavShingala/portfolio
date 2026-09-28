import { LINKS, mailtoHref } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon, MailIcon, TwitterIcon } from "./icons";

/**
 * Compact icon row, used in the footer. The richer cards on the home page are
 * ProfileCards.
 *
 * An entry with an empty href is dropped, so a handle you haven't supplied yet
 * simply doesn't appear rather than linking nowhere.
 */
const PROFILES = [
  { key: "github", label: "GitHub", href: LINKS.github, Icon: GitHubIcon },
  { key: "linkedin", label: "LinkedIn", href: LINKS.linkedin, Icon: LinkedInIcon },
  { key: "twitter", label: "X (Twitter)", href: LINKS.twitter, Icon: TwitterIcon },
  { key: "email", label: "Email", href: LINKS.email ? mailtoHref : "", Icon: MailIcon },
] as const;

export function SocialLinks({
  size = 20,
  gap = "gap-6",
  className,
}: {
  size?: number;
  gap?: string;
  className?: string;
}) {
  const profiles = PROFILES.filter((profile) => profile.href !== "");

  return (
    <div className={cn("flex items-center", gap, className)}>
      {profiles.map(({ key, label, href, Icon }) => {
        const external = !href.startsWith("mailto:");

        return (
          <a
            key={key}
            href={href}
            aria-label={label}
            {...(external
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            className="text-muted transition-colors hover:text-accent"
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
