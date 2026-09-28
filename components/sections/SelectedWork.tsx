import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PUBLISHED } from "@/content/published";

/** How many projects the home page previews. The rest live on /projects. */
const FEATURED_PROJECTS = 3;

/**
 * The work, on the cover page. Without this a visitor who doesn't open the nav
 * never sees a product or a project — the home page was identity and a contact
 * form with nothing in between.
 *
 * A preview, not a copy: each group links through to its full page.
 */
export function SelectedWork() {
  const products = PUBLISHED.products;
  const projects = PUBLISHED.projects.slice(0, FEATURED_PROJECTS);

  if (products.length === 0 && projects.length === 0) return null;

  return (
    <section className="border-t border-border">
      <Container className="py-section">
        <h2 className="text-3xl tracking-tight sm:text-4xl">Selected work</h2>

        {products.length > 0 ? (
          <div data-accent="cyan" className="mt-12">
            <GroupHeader label="shipped products" href="/products" />
            <div className="mt-5 grid items-start gap-5 md:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        ) : null}

        {projects.length > 0 ? (
          <div data-accent="green" className="mt-14">
            <GroupHeader label="projects" href="/projects" />
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function GroupHeader({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className="font-mono text-xs tracking-[0.2em] text-muted">{label}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-section-accent"
      >
        View all
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
