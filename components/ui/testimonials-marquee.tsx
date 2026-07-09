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
  description = "Real words from real sessions — weddings, portraits, birthdays, and events across Texas.",
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

      <div className="mx-auto mt-12 max-w-xl px-6 text-center lg:mt-14 lg:px-10">
        <p className="mb-4 text-sm text-foreground/55">
          Worked with Lulu? Share your experience — reviews help other clients
          find the right photographer.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="/contact?review=1"
            className="border border-primary px-6 py-2.5 text-[11px] tracking-[0.18em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Leave a Review
          </a>
          <a
            href="https://www.instagram.com/capturedbylulu_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.18em] uppercase text-foreground/50 transition-colors hover:text-primary"
          >
            Or DM on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
