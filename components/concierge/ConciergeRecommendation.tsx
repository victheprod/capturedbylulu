"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ConciergeRecommendation } from "@/lib/concierge/types";
import { conciergeMicrocopy } from "@/lib/concierge/copy";
import { resultCollageImages } from "@/lib/concierge/visuals";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ConciergeRecommendationProps = {
  recommendation: ConciergeRecommendation;
  onRestart: () => void;
  onInquire?: () => void;
  compact?: boolean;
  className?: string;
};

export function ConciergeRecommendationReveal({
  recommendation,
  onRestart,
  onInquire,
  compact,
  className,
}: ConciergeRecommendationProps) {
  const reduceMotion = useReducedMotion();
  const {
    package: pkg,
    category,
    reasons,
    investmentLabel,
    investmentRange,
    contactHref,
    alternatePackage,
  } = recommendation;

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("space-y-8", className)}
    >
      <motion.header {...fade(0.05)}>
        <p className="text-[10px] tracking-[0.32em] uppercase text-primary">
          {conciergeMicrocopy.seeRecommendation}
        </p>
        <h2
          className={cn(
            "mt-3 font-serif font-light leading-[1.12] text-foreground",
            compact
              ? "text-[clamp(1.65rem,4vw,2.25rem)]"
              : "text-[clamp(1.85rem,4vw,2.75rem)]",
          )}
        >
          Here&apos;s what we recommend for you.
        </h2>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <motion.article
          {...fade(0.12)}
          className="rounded-[1.75rem] border border-primary/20 bg-primary/[0.04] p-6 sm:p-8"
        >
          <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/40">
            Signature collection
          </p>
          <h3 className="mt-3 font-serif text-2xl font-light uppercase tracking-wide text-foreground sm:text-3xl">
            {pkg.name}
          </h3>
          <p className="mt-1 text-sm text-foreground/45">{category}</p>

          <ul className="mt-6 space-y-3">
            {pkg.features.slice(0, 5).map((feature) => (
              <li key={feature} className="flex gap-3 text-sm text-foreground/62">
                <Check size={14} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-foreground/10 pt-6">
            <p className="text-[9px] tracking-[0.28em] uppercase text-foreground/38">
              Estimated investment
            </p>
            <p className="mt-2 font-serif text-3xl font-light text-primary">
              {investmentRange ?? investmentLabel}
            </p>
          </div>
        </motion.article>

        <motion.div {...fade(0.18)} className="relative min-h-[280px]">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {resultCollageImages.map((img, i) => (
              <div
                key={img.src}
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-card",
                  i === 0 ? "col-span-1 aspect-[3/4]" : "aspect-square",
                  i === 2 && "col-span-1 row-span-1",
                )}
              >
                <Image
                  src={img.src}
                  alt="CapturedByLulu photography"
                  fill
                  sizes="200px"
                  className="object-cover"
                  style={{ objectPosition: img.objectPosition }}
                />
              </div>
            ))}
          </div>

          <motion.div
            {...fade(0.28)}
            className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/40 bg-background/90 text-center shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:h-32 sm:w-32"
          >
            <span className="text-[9px] tracking-[0.22em] uppercase text-primary">Your</span>
            <span className="font-serif text-xl font-light text-foreground">Vision</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div {...fade(0.32)} className="space-y-3">
        <p className="text-[9px] tracking-[0.28em] uppercase text-foreground/38">
          Why this fits
        </p>
        {reasons.map((reason) => (
          <p key={reason} className="text-sm leading-relaxed text-foreground/55">
            {reason}
          </p>
        ))}
      </motion.div>

      {alternatePackage ? (
        <motion.p {...fade(0.36)} className="text-center text-sm text-foreground/42">
          Also consider{" "}
          <Link
            href={`/contact?package=${encodeURIComponent(alternatePackage.packageId)}&from=concierge`}
            className="text-primary hover:text-foreground"
          >
            {alternatePackage.package.name}
          </Link>
        </motion.p>
      ) : null}

      <motion.div
        {...fade(0.4)}
        className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center"
      >
        <Button href="/services" variant="outline" className="rounded-full sm:flex-1">
          {conciergeMicrocopy.viewCollection}
        </Button>
        <Button
          href={contactHref}
          className="rounded-full sm:flex-1"
          onClick={onInquire}
        >
          {conciergeMicrocopy.makeOfficial}
          <ArrowRight size={14} />
        </Button>
      </motion.div>

      <button
        type="button"
        onClick={onRestart}
        className="w-full text-center text-xs text-foreground/35 hover:text-primary"
      >
        {conciergeMicrocopy.restart}
      </button>
    </motion.div>
  );
}
