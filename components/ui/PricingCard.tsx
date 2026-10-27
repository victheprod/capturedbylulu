"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Package } from "@/data/packages";
import { getContactHref } from "@/data/packages";
import { Label } from "@/components/editorial/primitives";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  pkg: Package;
  category: string;
  contactHref?: string;
};

function CardShell({ popular, children }: { popular?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col border bg-card p-6 transition-colors duration-500 sm:p-8",
        popular ? "border-ink" : "border-ink/15 hover:border-ink/40",
      )}
    >
      {children}
    </div>
  );
}

function CardHeading({ pkg }: { pkg: Package }) {
  return (
    <div className="mb-6">
      <div className="flex min-h-4 items-center justify-between gap-4">
        <Label className="text-ink-soft">{pkg.duration}</Label>
        {pkg.popular && <Label className="text-oxblood">Most popular</Label>}
      </div>
      <h3 className="mt-5 font-serif text-3xl leading-tight font-light">{pkg.name}</h3>
      <p className="mt-2 font-serif text-4xl">{pkg.price}</p>
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="mb-7 flex flex-1 flex-col gap-3 border-t border-ink/12 pt-6">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80">
          <Check size={14} className="mt-0.5 shrink-0 text-oxblood" aria-hidden />
          {feature}
        </li>
      ))}
    </ul>
  );
}

function CardCta({ href, popular, children }: { href: string; popular?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group mt-auto flex w-full items-center justify-between border px-5 py-4 text-sm font-medium transition-colors duration-500",
        popular
          ? "border-ink bg-ink text-ivory hover:border-oxblood hover:bg-oxblood"
          : "border-ink/25 hover:border-ink hover:bg-ink hover:text-ivory",
      )}
    >
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

export function PricingCard({ pkg, category, contactHref }: PricingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const href = contactHref ?? getContactHref(category, pkg);
  const detailsId = `package-details-${pkg.id}`;

  return (
    <CardShell popular={pkg.popular}>
      <CardHeading pkg={pkg} />
      <FeatureList features={pkg.features} />

      {pkg.details && (
        <>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mb-5 flex w-fit items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
            aria-expanded={expanded}
            aria-controls={detailsId}
          >
            {expanded ? <Minus size={13} aria-hidden /> : <Plus size={13} aria-hidden />}
            {expanded ? "Less info" : "Package details"}
          </button>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id={detailsId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mb-6 text-sm leading-relaxed text-ink-soft">{pkg.details}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <CardCta href={href} popular={pkg.popular}>
        Request an estimate
      </CardCta>
    </CardShell>
  );
}

export function PricingCardCompact({
  pkg,
  category,
  note,
  contactHref,
  ctaLabel = "Request an estimate",
}: {
  pkg: Package;
  category: string;
  note?: string;
  contactHref?: string;
  ctaLabel?: string;
}) {
  const href = contactHref ?? getContactHref(category, pkg);

  return (
    <CardShell popular={pkg.popular}>
      <CardHeading pkg={pkg} />
      <FeatureList features={pkg.features} />
      {note && <p className="mb-6 text-sm italic text-ink-soft">{note}</p>}
      <CardCta href={href} popular={pkg.popular}>
        {ctaLabel}
      </CardCta>
    </CardShell>
  );
}
