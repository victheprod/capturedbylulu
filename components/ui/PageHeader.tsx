import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { EstimateButton, Label, delay } from "@/components/editorial/primitives";
import { framingForSrc } from "@/lib/photo-framing";
import { cn } from "@/lib/utils";

type Cta = { label: string; href: string };

type PageHeaderProps = {
  eyebrow: string;
  tagline?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  children?: React.ReactNode;
  className?: string;
};

/** Shared inner-page header: catalogue rule, oversized serif title, intro, optional landscape plate. */
export function PageHeader({
  eyebrow,
  tagline,
  title,
  description,
  imageSrc,
  imageAlt = "",
  imagePosition,
  primaryCta,
  secondaryCta,
  children,
  className,
}: PageHeaderProps) {
  const objectPosition =
    imagePosition ?? (imageSrc ? framingForSrc(imageSrc).objectPosition : undefined);
  const hasAside = description || primaryCta || secondaryCta || children;

  return (
    <header className={cn("relative pt-16 md:pt-20", className)}>
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="hero-rise flex items-center justify-between gap-6 border-b border-ink/15 pt-8 pb-4 md:pt-12">
          <Label className="text-oxblood">{eyebrow}</Label>
          {tagline && <Label className="hidden text-right text-ink-soft sm:inline">{tagline}</Label>}
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-8 pt-10 pb-14 md:pt-14 md:pb-20 lg:items-end">
          <h1
            className="hero-rise col-span-12 font-serif text-[13vw] leading-[0.92] font-light tracking-[-0.035em] text-balance sm:text-[10vw] lg:col-span-8 lg:text-[6.6vw] 2xl:text-[7.5rem]"
            style={delay(120)}
          >
            {title}
          </h1>

          {hasAside && (
            <div
              className="hero-rise col-span-12 flex flex-col items-start gap-7 md:col-span-8 lg:col-span-4"
              style={delay(300)}
            >
              {description && (
                <p className="max-w-md text-lg leading-relaxed text-ink-soft">{description}</p>
              )}
              {(primaryCta || secondaryCta) && (
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  {primaryCta && <EstimateButton href={primaryCta.href}>{primaryCta.label}</EstimateButton>}
                  {secondaryCta && (
                    <Link
                      href={secondaryCta.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium"
                    >
                      <span className="link-line pb-1">{secondaryCta.label}</span>
                      <ArrowUpRight
                        className="h-4 w-4 text-oxblood transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  )}
                </div>
              )}
              {children}
            </div>
          )}
        </div>
      </div>

      {imageSrc && (
        <div className="mx-auto max-w-[1600px] md:px-10">
          <div className="relative aspect-[4/3] overflow-hidden bg-bone sm:aspect-[21/9]">
            <PhotoImage
              src={imageSrc}
              alt={imageAlt}
              fill
              preload
              fetchPriority="high"
              objectPosition={objectPosition}
              className="hero-settle"
              sizes="(max-width: 1600px) 100vw, 1520px"
            />
          </div>
        </div>
      )}
    </header>
  );
}
