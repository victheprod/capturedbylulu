"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
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

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Shared inner-page header: label column left, headline right, landscape photo below. */
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
  const reduced = useReducedMotion();
  const objectPosition =
    imagePosition ?? (imageSrc ? framingForSrc(imageSrc).objectPosition : undefined);

  return (
    <header className={cn("relative bg-background", className)}>
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pt-32 pb-12 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pt-40 lg:pb-16"
        variants={reduced ? undefined : container}
        initial={reduced ? false : "hidden"}
        animate="visible"
      >
        <motion.div
          variants={reduced ? undefined : item}
          className="flex flex-col justify-end gap-3 lg:col-span-4"
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          {tagline && (
            <p className="max-w-xs text-sm leading-relaxed text-foreground/50">
              {tagline}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={reduced ? undefined : item}
          className="flex flex-col items-start gap-6 lg:col-span-7 lg:col-start-6"
        >
          <h1 className="text-balance font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.03] tracking-[-0.02em] text-foreground">
            {title}
          </h1>
          {description && (
            <p className="max-w-xl text-base leading-relaxed text-foreground/60">
              {description}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              {primaryCta && (
                <Button href={primaryCta.href}>{primaryCta.label}</Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="link">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
          {children}
        </motion.div>
      </motion.div>

      {imageSrc && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl px-6 lg:px-10"
        >
          <div className="relative aspect-[3/2] overflow-hidden bg-card mask-t-from-85% sm:aspect-[21/9]">
            <PhotoImage
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              objectPosition={objectPosition}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </motion.div>
      )}
    </header>
  );
}
