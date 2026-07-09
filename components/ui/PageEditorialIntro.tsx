"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { framingForSrc } from "@/lib/photo-framing";
import { cn } from "@/lib/utils";

type PageEditorialIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  imageSrc?: string;
  className?: string;
  dark?: boolean;
};

export function PageEditorialIntro({
  eyebrow,
  title,
  description,
  imageSrc,
  className,
  dark = false,
}: PageEditorialIntroProps) {
  const framing = imageSrc ? framingForSrc(imageSrc) : null;

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-28 lg:pt-32",
        dark ? "bg-[#14110e]" : "bg-background",
        className,
      )}
    >
      {imageSrc && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] lg:opacity-[0.18]">
          <PhotoImage
            src={imageSrc}
            alt=""
            fill
            objectPosition={framing?.objectPosition}
            sizes="100vw"
            className="scale-105"
          />
          <div
            className={cn(
              "absolute inset-0",
              dark
                ? "bg-gradient-to-b from-[#14110e] via-[#14110e]/90 to-[#14110e]"
                : "bg-gradient-to-b from-background via-background/92 to-background",
            )}
          />
          {dark && <FilmGrain opacity={0.03} />}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-20">
        <FadeIn className="max-w-3xl">
          <p className="mb-6 flex items-center gap-4 text-[11px] tracking-[0.32em] uppercase text-primary">
            <span className="h-px w-10 bg-primary/60" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,6.5vw,4.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/55">
              {description}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
