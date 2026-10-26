import { testimonials } from "@/data/testimonials";
import { TestimonialsMarquee } from "@/components/ui/testimonials-marquee";
import type { PublicTestimonial } from "@/lib/cms/testimonials";

export function TestimonialsSection({
  testimonials: propTestimonials,
}: {
  testimonials?: PublicTestimonial[];
}) {
  const items = propTestimonials ?? testimonials;
  if (!items.length) return null;

  return (
    <TestimonialsMarquee
      testimonials={items.map((t) => ({
        author: { name: t.name, role: t.type },
        text: t.quote,
        stars: t.stars,
      }))}
    />
  );
}
