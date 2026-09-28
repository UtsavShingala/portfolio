import Image from "next/image";
import { PROFILES } from "@/content/profiles";
import type { Profile } from "@/content/types";
import { SITE } from "@/lib/constants";
import { isPlaceholder } from "@/lib/placeholder";
import { cn } from "@/lib/utils";
import {
  ExternalArrowIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  type IconProps,
} from "./icons";

const PLATFORM_ICONS: Record<Profile["id"], (props: IconProps) => React.ReactNode> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
};

export function ProfileCards({ className }: { className?: string }) {
  const profiles = PROFILES.filter((profile) => profile.href !== "");

  if (profiles.length === 0) return null;

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}

/**
 * Each card shows the photo that platform actually displays. When one hasn't
 * been supplied we render initials rather than reusing another platform's
 * photo — a card claiming to preview LinkedIn while showing the GitHub avatar
 * reads as fabricated.
 */
function CardAvatar({ src, name }: { src?: string; name: string }) {
  if (!src) {
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-bg font-mono text-xs text-muted">
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={44}
      height={44}
      className="h-11 w-11 shrink-0 rounded-full border border-border object-cover"
    />
  );
}

function ProfileCard({ profile }: { profile: Profile }) {
  const Icon = PLATFORM_ICONS[profile.id];

  return (
    <article
      data-accent={profile.accent ?? "green"}
      className="flex flex-col rounded-lg border border-border bg-card"
    >
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-3.5 text-section-accent">
        <Icon size={16} />
        <span className="font-mono text-xs tracking-[0.15em]">
          {profile.platform}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <CardAvatar src={profile.avatar} name={SITE.name} />
          <div className="min-w-0">
            <p className="truncate">{SITE.name}</p>
            <p className="truncate font-mono text-xs text-muted">
              {profile.handle}
            </p>
          </div>
        </div>

        {/* Bio and meta are hidden on phones: stacked one per row, three full
            cards took about two screens before anything else on the page. */}
        {isPlaceholder(profile.bio) ? null : (
          <p className="mt-4 hidden text-sm leading-relaxed text-muted sm:block">
            {profile.bio}
          </p>
        )}

        {profile.meta ? (
          <p className="mt-3 hidden font-mono text-xs text-muted sm:block">
            {profile.meta}
          </p>
        ) : null}

        {/* mt-auto pins the button to the card foot so cards of differing
            bio lengths still line up. */}
        <div className="mt-auto pt-4 sm:pt-6">
          <a
            href={profile.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3.5 py-2 text-sm text-text transition-colors hover:border-muted hover:text-section-accent"
          >
            View profile
            <ExternalArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
