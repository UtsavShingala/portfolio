import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/ui/ProductCard";
import { PUBLISHED } from "@/content/published";

export function Products() {
  return (
    <Section id="products">
      <div className="grid items-start gap-5 md:grid-cols-2">
        {PUBLISHED.products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </Section>
  );
}
