import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PUBLISHED } from "@/content/published";

export function Blogs() {
  return (
    <Section id="blogs">
      {PUBLISHED.posts.length === 0 ? (
        <p className="border-t border-border pt-8 font-mono text-sm text-muted">
          First entries coming soon.
        </p>
      ) : null}
      <div className="border-t border-border">
        {PUBLISHED.posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col gap-2 border-b border-border py-7 sm:flex-row sm:items-start sm:justify-between sm:gap-10"
          >
            <div className="max-w-3xl">
              <h3 className="text-lg">
                {post.status === "published" ? (
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                ) : (
                  post.title
                )}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{post.summary}</p>
            </div>

            <p className="shrink-0 font-mono text-sm text-muted">
              {post.status === "published" ? post.date : "Coming soon"}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
