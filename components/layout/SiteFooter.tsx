import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base tracking-tight text-text">{SITE.name}</p>
          <p className="mt-1.5 text-sm text-muted">{SITE.role}</p>
        </div>

        <SocialLinks size={18} gap="gap-5" />
      </Container>
    </footer>
  );
}
