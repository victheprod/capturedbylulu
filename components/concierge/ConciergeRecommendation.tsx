"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { ConciergeRecommendation } from "@/lib/concierge/types";
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
  const {
    package: pkg,
    category,
    reasons,
    investmentLabel,
    investmentRange,
    addons,
    nextSteps,
    contactHref,
    alternatePackage,
  } = recommendation;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn("space-y-10", className)}
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mx-auto mb-6 flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/10 text-primary"
        >
          <Sparkles size={18} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-[11px] tracking-[0.32em] uppercase text-primary"
        >
          Based on what you shared
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7 }}
          className={cn(
          "mt-4 font-serif font-light leading-[1.08] text-foreground",
          compact
            ? "text-[clamp(1.75rem,4vw,2.5rem)]"
            : "text-[clamp(2rem,5vw,3.5rem)]",
        )}
      >
        This feels like your <span className="text-primary/90">best fit</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-foreground/55"
      >
        The {pkg.name} {category.toLowerCase()} package aligns with your vision,
        coverage needs, and investment comfort.
      </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.7 }}
        className="glass-panel mx-auto max-w-3xl p-8 sm:p-10"
      >
        <div className="flex flex-col gap-6 border-b border-foreground/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-foreground/45">
              Recommended package
            </p>
            <h3 className="mt-2 font-serif text-3xl font-light text-foreground">
              {category} · {pkg.name}
            </h3>
            <p className="mt-2 text-sm text-foreground/50">{pkg.duration}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[11px] tracking-[0.2em] uppercase text-primary">
              Estimated investment
            </p>
            <p className="mt-1 font-serif text-3xl font-light text-foreground">
              {investmentRange ?? investmentLabel}
            </p>
            {investmentRange && investmentRange !== investmentLabel ? (
              <p className="mt-1 text-xs text-foreground/40">
                Package base: {investmentLabel}
              </p>
            ) : null}
          </div>
        </div>

        <div className="py-8">
          <p className="mb-4 text-[11px] tracking-[0.22em] uppercase text-primary">
            Why this fits you
          </p>
          <ul className="space-y-4">
            {reasons.map((reason, i) => (
              <motion.li
                key={reason}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="flex gap-4 text-sm leading-relaxed text-foreground/62"
              >
                <span className="mt-2 h-px w-6 shrink-0 bg-primary/50" aria-hidden />
                {reason}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="border-t border-foreground/10 pt-8">
          <p className="mb-4 text-[11px] tracking-[0.22em] uppercase text-foreground/45">
            Included in this package
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {pkg.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-foreground/58"
              >
                <span className="text-primary" aria-hidden>·</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {addons.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mx-auto max-w-3xl"
        >
          <p className="mb-5 text-center text-[11px] tracking-[0.22em] uppercase text-primary">
            Suggested add-ons
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className={cn(
                  "border p-5",
                  addon.inquiryOnly
                    ? "border-foreground/8 bg-card/20"
                    : "border-foreground/10 bg-card/30",
                )}
              >
                <p className="text-sm font-medium text-foreground">{addon.name}</p>
                <p className="mt-1 text-xs text-primary">{addon.price}</p>
                <p className="mt-3 text-xs leading-relaxed text-foreground/48">
                  {addon.reason}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.62 }}
        className="glass-panel-subtle mx-auto max-w-3xl p-8"
      >
        <p className="mb-5 text-[11px] tracking-[0.22em] uppercase text-primary">
          What happens next
        </p>
        <ol className="space-y-4">
          {nextSteps.map((step, i) => (
            <li key={step} className="flex gap-4 text-sm text-foreground/58">
              <span className="font-serif text-lg font-light text-primary/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {alternatePackage ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.68 }}
          className="mx-auto max-w-2xl text-center text-sm text-foreground/45"
        >
          Also worth exploring:{" "}
          <Link
            href={`/contact?package=${encodeURIComponent(alternatePackage.packageId)}&from=concierge`}
            className="text-primary transition-colors hover:text-foreground"
          >
            {alternatePackage.package.name} ({alternatePackage.package.price})
          </Link>
        </motion.p>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.72 }}
        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Button
          href={contactHref}
          className="min-w-[240px]"
          onClick={onInquire}
        >
          Begin your inquiry
          <ArrowRight size={14} />
        </Button>
        <button
          type="button"
          onClick={onRestart}
          className="text-[11px] tracking-[0.18em] uppercase text-foreground/45 transition-colors hover:text-primary"
        >
          Start over
        </button>
      </motion.div>
    </motion.div>
  );
}
