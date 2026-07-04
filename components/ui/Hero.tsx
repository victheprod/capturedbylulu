import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { siteImages } from "@/data/portfolio";
import { framingForSrc } from "@/lib/photo-framing";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

type HeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  imageSrc?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  fullScreen?: boolean;
  align?: "bottom" | "center";
};

export function CinematicHero({
  eyebrow,
  title,
  subtitle,
  imageSrc = siteImages.hero,
  primaryCta,
  secondaryCta,
  fullScreen = true,
  align = "bottom",
}: HeroProps) {
  const framing = framingForSrc(imageSrc);

  return (
    <section
      className={`relative flex overflow-hidden ${
        fullScreen
          ? "h-screen min-h-[640px] items-end"
          : "min-h-[520px] items-end lg:min-h-[72vh]"
      } ${align === "center" ? "items-center" : "items-end"}`}
    >
      <div className="absolute inset-0 bg-background">
        <PhotoImage
          src={imageSrc}
          alt="CapturedByLulu photography by Lulu"
          fill
          priority
          objectPosition={framing.objectPosition}
          className="opacity-95"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <FadeIn className="max-w-3xl">
          {eyebrow && (
            <p className="mb-5 text-[11px] tracking-[0.35em] uppercase text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="mb-7 font-serif text-[clamp(3rem,8vw,5.5rem)] font-light leading-[1.04] text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mb-9 max-w-lg text-base leading-relaxed text-foreground/65 lg:text-lg">
              {subtitle}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col gap-4 sm:flex-row">
              {primaryCta && (
                <Button href={primaryCta.href}>{primaryCta.label}</Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outline">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </FadeIn>
      </div>

      {fullScreen && (
        <div className="absolute right-8 bottom-8 z-10 hidden flex-col items-center gap-3 lg:right-12 lg:flex">
          <div className="h-12 w-px bg-foreground/25" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 [writing-mode:vertical-rl]">
            Scroll
          </span>
        </div>
      )}
    </section>
  );
}

export function CTASection({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  imageSrc = siteImages.cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc?: string;
}) {
  const framing = framingForSrc(imageSrc);

  return (
    <section className="relative overflow-hidden px-6 py-36 lg:px-10 lg:py-44">
      <div className="absolute inset-0 bg-surface">
        <PhotoImage
          src={imageSrc}
          alt=""
          fill
          aria-hidden
          objectPosition={framing.objectPosition}
          className="opacity-12"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-surface" />
      </div>
      <FadeIn className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-5 text-[11px] tracking-[0.25em] uppercase text-primary">
          {eyebrow}
        </p>
        <h2 className="mb-6 font-serif text-4xl font-light leading-tight text-foreground lg:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mb-10 max-w-md leading-relaxed text-foreground/58">
          {description}
        </p>
        <Button href={ctaHref} className="px-12 py-4 tracking-[0.22em]">
          {ctaLabel}
        </Button>
      </FadeIn>
    </section>
  );
}

export function PageHeroBanner({
  eyebrow,
  title,
  description,
  imageSrc = siteImages.servicesBanner,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  imageSrc?: string;
}) {
  const framing = framingForSrc(imageSrc);

  return (
    <div className="relative overflow-hidden px-6 pt-24 pb-20 lg:px-10 lg:pt-28 lg:pb-28">
      <div className="absolute inset-0">
        <PhotoImage
          src={imageSrc}
          alt=""
          fill
          aria-hidden
          objectPosition={framing.objectPosition}
          className="opacity-18"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </div>
      <FadeIn className="relative mx-auto max-w-7xl">
        <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-primary">
          {eyebrow}
        </p>
        <h1 className="max-w-xl font-serif text-5xl font-light text-foreground lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-md leading-relaxed text-foreground/58">
            {description}
          </p>
        )}
      </FadeIn>
    </div>
  );
}

export function LinkArrow({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-foreground/50 transition-colors duration-300 hover:text-primary",
        className,
      )}
    >
      {children} <ArrowRight size={13} />
    </Link>
  );
}
