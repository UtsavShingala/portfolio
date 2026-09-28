import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-section text-center">
      <p className="font-mono text-sm text-accent">404</p>

      <h1 className="mt-6 text-4xl tracking-tight">Page not found</h1>

      <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
        That page doesn&apos;t exist — it may have moved or never been here.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-text transition-colors hover:border-muted"
      >
        <span aria-hidden="true">←</span> Back home
      </Link>
    </Container>
  );
}
