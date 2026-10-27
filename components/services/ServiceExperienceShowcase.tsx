"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Package, PackageCategory } from "@/data/packages";
import { getContactHref } from "@/data/packages";
import { Label, delay } from "@/components/editorial/primitives";
import { cn } from "@/lib/utils";

const categoryStories: Record<string, { headline: string; story: string }> = {
  Portraits: {
    headline: "Portraits that feel like you, not a stock photo.",
    story:
      "Natural direction and light that flatters without feeling staged. From mini sessions to full creative portraits.",
  },
  Families: {
    headline: "The way you actually love each other.",
    story:
      "Relaxed family sessions built around connection instead of forced poses. The laughter, the chaos, and the quiet moments in between.",
  },
  Events: {
    headline: "Milestone moments, documented with energy.",
    story:
      "Birthdays, parties, and gatherings, covered start to finish: the toasts, the dance floor, and the details you spent weeks on.",
  },
  Headshots: {
    headline: "Confidence you can see.",
    story:
      "Professional headshots and brand-ready portraits for LinkedIn, teams, and entrepreneurs who want to stand out.",
  },
};

type ServiceExperienceShowcaseProps = {
  categories: PackageCategory[];
};

export function ServiceExperienceShowcase({ categories }: ServiceExperienceShowcaseProps) {
  const [openId, setOpenId] = useState(categories[0]?.id ?? "");
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  return (
    <div className="border-b border-ink/15">
      {categories.map((category, index) => {
        const isOpen = openId === category.id;
        const story = categoryStories[category.category] ?? {
          headline: `${category.category} sessions`,
          story: "Packages and pricing below.",
        };
        const panelId = `service-panel-${category.id}`;

        return (
          <article key={category.id} className="reveal border-t border-ink/15" style={delay(index * 80)}>
            <button
              type="button"
              onClick={() => {
                setOpenId(isOpen ? "" : category.id);
                setExpandedPackage(null);
              }}
              className="group grid w-full grid-cols-[3rem_1fr_auto] items-start gap-x-4 py-8 text-left md:grid-cols-[6rem_1fr_auto] md:py-10"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <Label className="pt-3 text-oxblood">{String(index + 1).padStart(2, "0")}</Label>
              <span>
                <span className="block font-serif text-4xl leading-none font-light transition-colors duration-500 group-hover:text-oxblood md:text-6xl">
                  {category.category}
                </span>
                <span className="mt-3 block max-w-lg font-serif text-lg italic text-ink-soft">
                  {story.headline}
                </span>
              </span>
              <span
                className={cn(
                  "mt-2 flex h-10 w-10 items-center justify-center border transition-colors duration-500",
                  isOpen ? "border-ink bg-ink text-ivory" : "border-ink/20 group-hover:border-ink",
                )}
                aria-hidden
              >
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-10 md:pl-[7rem]">
                    <p className="mb-8 max-w-2xl leading-relaxed text-ink-soft">{story.story}</p>
                    {category.note && <p className="mb-6 text-sm italic text-ink-soft">{category.note}</p>}

                    <div className="divide-y divide-ink/10 border-y border-ink/10">
                      {category.packages.map((pkg) => (
                        <PackageExperienceRow
                          key={pkg.id}
                          pkg={pkg}
                          category={category.category}
                          isExpanded={expandedPackage === pkg.id}
                          onToggle={() =>
                            setExpandedPackage((current) => (current === pkg.id ? null : pkg.id))
                          }
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}

function PackageExperienceRow({
  pkg,
  category,
  isExpanded,
  onToggle,
}: {
  pkg: Package;
  category: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const href = getContactHref(category, pkg);

  return (
    <div className="py-5">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={isExpanded}
      >
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-serif text-2xl transition-colors group-hover:text-oxblood">{pkg.name}</span>
          {pkg.popular && <Label className="text-oxblood">Most popular</Label>}
          <span className="text-sm text-ink-soft">{pkg.duration}</span>
        </span>
        <span className="flex shrink-0 items-center gap-4">
          <span className="font-serif text-2xl">{pkg.price}</span>
          {isExpanded ? (
            <Minus size={14} className="text-ink-soft" aria-hidden />
          ) : (
            <Plus size={14} className="text-ink-soft" aria-hidden />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="pt-5">
              {pkg.details && <p className="mb-4 text-sm text-ink-soft">{pkg.details}</p>}
              <ul className="mb-6 space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <Check size={14} className="mt-0.5 shrink-0 text-oxblood" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={href} className="group inline-flex items-center gap-2 text-sm font-medium">
                <span className="link-line pb-1">Request this package</span>
                <ArrowUpRight
                  size={14}
                  className="text-oxblood transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
