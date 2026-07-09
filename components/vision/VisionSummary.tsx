"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { VisionBoardImage, VisionRecommendation } from "@/lib/vision/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type VisionSummaryRevealProps = {
  recommendation: VisionRecommendation;
  boardImages: VisionBoardImage[];
  onRestart: () => void;
  className?: string;
};

export function VisionSummaryReveal({
  recommendation,
  boardImages,
  onRestart,
  className,
}: VisionSummaryRevealProps) {
  const reduceMotion = useReducedMotion();
  const {
    package: pkg,
    category,
    preferredStyles,
    visualThemes,
    suggestedLocations,
    addons,
    reasons,
    investmentLabel,
    contactHref,
  } = recommendation;

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
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
      <motion.header {...fade(0.05)} className="max-w-2xl">
        <p className="font-serif text-7xl font-light leading-none text-foreground/10 sm:text-8xl">
          ✦
        </p>
        <p className="mt-2 text-[10px] tracking-[0.36em] uppercase text-primary">
          Your Vision
        </p>
        <h2 className="mt-3 font-serif text-[clamp(2rem,4.5vw,3rem)] font-light leading-[1.1] text-foreground">
          Curated for you
        </h2>
      </motion.header>

      {/* Bento grid — asymmetric, not concierge's centered card stack */}
      <div className="grid gap-4 sm:grid-cols-12 sm:gap-5">
        <motion.article
          {...fade(0.12)}
          className="vision-atelier col-span-12 rounded-[2rem] p-7 sm:col-span-7 sm:p-9"
        >
          <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/38">
            Recommended package
          </p>
          <h3 className="mt-3 font-serif text-3xl font-light text-foreground sm:text-4xl">
            {pkg.name}
          </h3>
          <p className="mt-1 text-sm text-foreground/45">{category}</p>
          <p className="mt-5 font-serif text-2xl text-primary">{investmentLabel}</p>
          <p className="mt-3 text-sm text-foreground/52">
            {pkg.duration} · {pkg.features[0]}
          </p>
          <div className="mt-8 space-y-3 border-t border-foreground/8 pt-6">
            {reasons.map((reason) => (
              <p key={reason} className="text-sm leading-relaxed text-foreground/55">
                {reason}
              </p>
            ))}
          </div>
        </motion.article>

        <motion.div
          {...fade(0.18)}
          className="vision-cork col-span-12 flex min-h-[220px] flex-col rounded-[2rem] p-5 sm:col-span-5"
        >
          <p className="text-[9px] tracking-[0.3em] uppercase text-primary/85">
            Inspiration board
          </p>
          <div className="relative mt-4 flex-1">
            {boardImages.slice(0, 4).map((img, i) => {
              const pos = [
                { top: "0%", left: "5%", rotate: -6, w: "46%" },
                { top: "8%", left: "48%", rotate: 4, w: "44%" },
                { top: "48%", left: "0%", rotate: 3, w: "42%" },
                { top: "52%", left: "46%", rotate: -5, w: "40%" },
              ][i];
              return (
                <div
                  key={img.id}
                  className="vision-polaroid absolute bg-[#f5f0e6] p-1 pb-3 shadow-lg"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    width: pos.w,
                    rotate: `${pos.rotate}deg`,
                  }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.styleLabel ?? img.category}
                      fill
                      sizes="120px"
                      className="object-cover"
                      style={{ objectPosition: img.objectPosition }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          {...fade(0.24)}
          className="col-span-12 rounded-[1.75rem] border border-foreground/10 bg-card/40 p-6 sm:col-span-4"
        >
          <SummaryBlock title="Photography style">
            <ChipRow items={preferredStyles} />
          </SummaryBlock>
        </motion.div>

        <motion.div
          {...fade(0.28)}
          className="col-span-12 rounded-[1.75rem] border border-foreground/10 bg-card/40 p-6 sm:col-span-4"
        >
          <SummaryBlock title="Visual themes">
            <ChipRow items={visualThemes} />
          </SummaryBlock>
        </motion.div>

        <motion.div
          {...fade(0.32)}
          className="col-span-12 rounded-[1.75rem] border border-foreground/10 bg-card/40 p-6 sm:col-span-4"
        >
          <SummaryBlock title="Suggested locations">
            <ul className="space-y-2">
              {suggestedLocations.map((loc) => (
                <li key={loc} className="text-sm text-foreground/58">
                  → {loc}
                </li>
              ))}
            </ul>
          </SummaryBlock>
        </motion.div>

        {addons.length > 0 ? (
          <motion.div
            {...fade(0.36)}
            className="col-span-12 rounded-[1.75rem] border border-primary/15 bg-primary/[0.04] p-6 sm:p-7"
          >
            <SummaryBlock title="Recommended add-ons">
              <div className="grid gap-4 sm:grid-cols-2">
                {addons.map((addon) => (
                  <div
                    key={addon.name}
                    className="rounded-2xl border border-foreground/8 bg-background/30 px-4 py-3"
                  >
                    <p className="text-sm text-foreground/85">
                      {addon.name}{" "}
                      <span className="text-foreground/40">· {addon.price}</span>
                    </p>
                    <p className="mt-1 text-xs text-foreground/48">{addon.reason}</p>
                  </div>
                ))}
              </div>
            </SummaryBlock>
          </motion.div>
        ) : null}
      </div>

      <motion.div
        {...fade(0.42)}
        className="flex flex-col items-start gap-4 pt-4 sm:flex-row sm:items-center"
      >
        <Button href={contactHref} className="rounded-full px-10">
          Continue to inquire
          <ArrowRight size={16} />
        </Button>
        <button
          type="button"
          onClick={onRestart}
          className="text-[11px] tracking-[0.14em] text-foreground/40 underline-offset-4 hover:text-primary hover:underline"
        >
          Start a new board
        </button>
      </motion.div>
    </motion.div>
  );
}

function SummaryBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[9px] tracking-[0.28em] uppercase text-foreground/35">
        {title}
      </p>
      {children}
    </div>
  );
}

function ChipRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-foreground/12 bg-background/40 px-3 py-1 text-xs text-foreground/65"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
