"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { siteImages } from "@/data/portfolio";
import { framingForSrc } from "@/lib/photo-framing";

type EstimateCTAProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
};

export function EstimateCTA({
  eyebrow = "Estimates",
  title = "Tell Lulu what you're planning.",
  description = "Send the date, the place, and the idea. Lulu replies by email with a price, usually within a day or two. Nothing is booked until you both agree.",
  ctaLabel = "Get an estimate",
  ctaHref = "/contact",
  imageSrc = siteImages.cta,
}: EstimateCTAProps) {
  const reduced = useReducedMotion();
  const framing = framingForSrc(imageSrc);

  return (
    <section
      className="border-t border-foreground/10 bg-surface"
      aria-labelledby="estimate-cta-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-6 py-20 lg:px-10 lg:py-28 lg:pr-16"
        >
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          <h2
            id="estimate-cta-heading"
            className="text-balance font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] text-foreground"
          >
            {title}
          </h2>
          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-foreground/60">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={ctaHref} arrow>
              {ctaLabel}
            </Button>
            <Button href="/contact?quote=custom" variant="link" arrow={false}>
              Or ask for a custom quote
            </Button>
          </div>
        </motion.div>

        <div className="relative min-h-[22rem] lg:min-h-[34rem]">
          <PhotoImage
            src={imageSrc}
            alt=""
            fill
            objectPosition={framing.objectPosition}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
