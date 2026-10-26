import type { ReactNode } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { heroPhotos } from "@/data/home";
import { EstimateButton, Label, delay } from "@/components/editorial/primitives";

type HomeHeroProps = {
  eyebrow: string;
  /** Overrides the default two-line headline (from the CMS). */
  title?: string;
  subtitle: string;
};

const defaultTitle: ReactNode = (
  <>
    <span className="hero-rise block" style={delay(120)}>
      You, but
    </span>
    <span className="hero-rise block md:pl-[18%]" style={delay(260)}>
      <em className="text-oxblood italic">art-directed.</em>
    </span>
  </>
);

export function HomeHero({ eyebrow, title, subtitle }: HomeHeroProps) {
  const { desktop, mobile } = heroPhotos;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...desktop, sizes: "(min-width: 768px) 84vw, 100vw", quality: 80 });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...mobile, sizes: "100vw", quality: 75 });

  return (
    <section aria-labelledby="hero-title" className="relative pt-16 md:pt-20">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="hero-rise flex items-center justify-between border-b border-ink/15 pt-8 pb-4 md:pt-12">
          <Label>{eyebrow}</Label>
          <Label className="hidden sm:inline">Weddings &middot; Portraits &middot; Families &middot; Events</Label>
        </div>
        <h1
          id="hero-title"
          className="relative z-10 mt-8 font-serif text-[15vw] leading-[0.88] font-light tracking-[-0.035em] md:mt-10 md:text-[12vw] xl:text-[11.5rem]"
        >
          {title ? (
            <span className="hero-rise block" style={delay(120)}>
              {title}
            </span>
          ) : (
            defaultTitle
          )}
        </h1>
      </div>

      <div className="relative mx-auto -mt-[4vw] max-w-[1600px] md:px-10">
        <figure className="relative overflow-hidden md:ml-[16%]">
          <picture className="block aspect-[2/3] overflow-hidden md:aspect-[16/9]">
            <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
            <source srcSet={mobileSrcSet} />
            <img
              {...imgProps}
              alt={heroPhotos.alt}
              fetchPriority="high"
              loading="eager"
              className="hero-settle h-full w-full object-cover object-[50%_60%]"
            />
          </picture>
          <figcaption className="absolute bottom-0 left-0 max-w-[19rem] bg-ivory px-5 py-4 md:px-6 md:py-5">
            <Label className="text-oxblood">Plate I</Label>
            <p className="mt-1 font-serif text-lg leading-snug italic">{heroPhotos.caption}</p>
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 py-14 md:py-20">
          <p
            className="hero-rise col-span-12 text-lg leading-relaxed md:col-span-5 md:text-xl lg:col-span-4"
            style={delay(500)}
          >
            {subtitle}
          </p>
          <div
            className="hero-rise col-span-12 flex flex-col items-start gap-6 md:col-span-6 md:col-start-7 lg:col-start-8"
            style={delay(620)}
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <EstimateButton />
              <Link href="/portfolio" className="group inline-flex items-center gap-2 text-sm font-medium">
                <span className="link-line pb-1">Explore the portfolio</span>
                <ArrowUpRight
                  className="h-4 w-4 text-oxblood transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Tell Lulu about your day. He reads every inquiry personally and confirms price and date by
              email, usually within a day or two.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
