"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Package } from "@/data/packages";
import { getContactHref, pricingNotes } from "@/data/packages";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  pkg: Package;
  category: string;
  contactHref?: string;
};

export function PricingCard({
  pkg,
  category,
  contactHref,
}: PricingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const href = contactHref ?? getContactHref(category, pkg);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col border bg-card p-6 transition-all duration-300 hover:border-primary/35 sm:p-8",
        pkg.popular ? "border-primary/45 pt-8" : "border-foreground/10",
      )}
    >
      {pkg.popular && (
        <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary px-3 py-1">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-primary-foreground">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif text-xl text-foreground">{pkg.name}</h3>
          <p className="mt-1 text-xs text-foreground/45">{pkg.duration}</p>
        </div>
        <p className="shrink-0 font-serif text-2xl text-primary">{pkg.price}</p>
      </div>

      <ul className="mb-6 flex flex-1 flex-col gap-2.5">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check size={12} className="mt-0.5 shrink-0 text-primary" />
            <span className="text-sm text-foreground/65">{feature}</span>
          </li>
        ))}
      </ul>

      {pkg.details && (
        <>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mb-4 flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase text-primary transition-opacity hover:opacity-70"
          >
            {expanded ? <Minus size={11} /> : <Plus size={11} />}
            {expanded ? "Less info" : "Package details"}
          </button>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mb-5 border-t border-foreground/10 pt-4">
                  <p className="text-sm leading-relaxed text-foreground/58">
                    {pkg.details}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <p className="mb-4 text-[10px] leading-relaxed text-foreground/40">
        {pricingNotes.travel}
      </p>

      <Link
        href={href}
        className={cn(
          "mt-auto block w-full py-3 text-center text-[11px] tracking-[0.18em] uppercase transition-all duration-300",
          pkg.popular
            ? "bg-primary text-primary-foreground hover:bg-[#d4b87a]"
            : "border border-foreground/20 text-foreground/60 hover:border-primary hover:text-primary",
        )}
      >
        Book This Package
      </Link>
    </div>
  );
}

export function PricingCardCompact({
  pkg,
  category,
  note,
  contactHref,
  ctaLabel = "Inquire Now",
}: {
  pkg: Package;
  category: string;
  note?: string;
  contactHref?: string;
  ctaLabel?: string;
}) {
  const href = contactHref ?? getContactHref(category, pkg);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col border bg-card p-6 sm:p-8",
        pkg.popular ? "border-primary/45 pt-10" : "border-foreground/10",
      )}
    >
      {pkg.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-primary px-4 py-1">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-primary-foreground">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-5">
        <h3 className="mb-1 font-serif text-2xl text-foreground">{pkg.name}</h3>
        <p className="text-xs text-foreground/45">{pkg.duration}</p>
      </div>
      <p className="mb-7 font-serif text-3xl text-primary">{pkg.price}</p>
      <ul className="mb-7 flex flex-1 flex-col gap-3">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check size={12} className="mt-0.5 shrink-0 text-primary" />
            <span className="text-sm text-foreground/65">{feature}</span>
          </li>
        ))}
      </ul>
      {note && (
        <p className="mb-6 text-xs italic text-foreground/35">{note}</p>
      )}
      <p className="mb-4 text-[10px] leading-relaxed text-foreground/40">
        {pricingNotes.travel}
      </p>
      <Link
        href={href}
        className={cn(
          "mt-auto block w-full py-3 text-center text-[11px] tracking-[0.18em] uppercase transition-all duration-300",
          pkg.popular
            ? "bg-primary text-primary-foreground hover:bg-[#d4b87a]"
            : "border border-foreground/20 text-foreground/55 hover:border-primary hover:text-primary",
        )}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
