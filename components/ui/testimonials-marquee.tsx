import { cn } from "@/lib/utils";
import {
  TestimonialCard,
  type TestimonialAuthor,
} from "@/components/ui/testimonial-card";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type MarqueeTestimonial = {
  author: TestimonialAuthor;
  text: string;
  stars?: number;
  href?: string;
};

type TestimonialsMarqueeProps = {
  title?: string;
  description?: string;
  eyebrow?: string;
  testimonials: MarqueeTestimonial[];
  className?: string;
};

export function TestimonialsMarquee({
  title = "What clients are saying",
  description = "Real words from real sessions — weddings, portraits, birthdays, and events across San Antonio.",
  eyebrow = "Client Love",
  testimonials,
  className,
}: TestimonialsMarqueeProps) {
  if (!testimonials.length) return null;

  return (
    <section
      className={cn("overflow-hidden", className)}
      aria-label={title}
    >
      <div className="mx-auto mb-12 max-w-3xl px-6 text-center lg:mb-14 lg:px-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="group [--duration:48s] [--gap:1rem]">
          <div className="animate-marquee flex w-max [gap:var(--gap)] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            <div className="flex [gap:var(--gap)]">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={`set-a-${i}`} {...testimonial} />
              ))}
            </div>
            <div className="flex [gap:var(--gap)]" aria-hidden>
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={`set-b-${i}`} {...testimonial} />
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-surface to-transparent sm:block md:w-28 lg:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-surface to-transparent sm:block md:w-28 lg:w-40" />
      </div>
    </section>
  );
}
