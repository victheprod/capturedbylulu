"use client";

import { FadeIn } from "@/components/ui/FadeIn";

type PortfolioEditorialIntroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function PortfolioEditorialIntro({
  eyebrow = "CapturedByLulu",
  title = "An exhibition of light, love, and life",
  description = "Scroll through curated chapters — then browse the full archive. Every image is a frame from a real story across Texas and beyond.",
}: PortfolioEditorialIntroProps) {
  return (
    <section className="px-6 pb-8 pt-28 lg:px-10 lg:pb-12 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="mb-6 flex items-center gap-4 text-[11px] tracking-[0.32em] uppercase text-primary">
            <span className="h-px w-12 bg-primary/60" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="max-w-4xl font-serif text-[clamp(2.75rem,7vw,5rem)] font-light leading-[1.02] tracking-[-0.02em] text-foreground">
            {title}
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/55">
            {description}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
