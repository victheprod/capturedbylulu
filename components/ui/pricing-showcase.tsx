"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CheckCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Package, PackageCategory } from "@/data/packages";
import { getContactHref } from "@/data/packages";
import { cn } from "@/lib/utils";

type PricingShowcaseProps = {
  categories: PackageCategory[];
  className?: string;
};

function CategorySwitch({
  categories,
  activeId,
  onChange,
  className,
}: {
  categories: PackageCategory[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div className="relative mx-auto flex w-max gap-1 rounded-full border border-foreground/12 bg-card/80 p-1 backdrop-blur-sm">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={cn(
                "relative z-10 shrink-0 cursor-pointer rounded-full px-4 py-2 text-[11px] tracking-[0.12em] uppercase transition-colors sm:px-5 sm:py-2.5",
                isActive
                  ? "text-primary-foreground"
                  : "text-foreground/50 hover:text-foreground/80",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="pricing-category-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative">{cat.category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WordReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.3em]", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 38,
              delay: i * 0.08,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function PricingPlanCard({
  pkg,
  category,
  index,
}: {
  pkg: Package;
  category: string;
  index: number;
}) {
  const href = getContactHref(category, pkg);
  const isPopular = Boolean(pkg.popular);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex h-full flex-col justify-between border p-6 sm:p-7",
        isPopular
          ? "z-10 border-primary/45 bg-gradient-to-b from-[#2a241c] to-card shadow-[0_24px_60px_-24px_rgba(200,169,106,0.35)] lg:scale-[1.03]"
          : "border-foreground/10 bg-card/60",
      )}
    >
      {isPopular && (
        <span className="absolute top-0 right-5 -translate-y-1/2 bg-primary px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-primary-foreground">
          Most popular
        </span>
      )}

      <div>
        <div className="mb-5 space-y-1">
          <motion.p
            key={`${pkg.id}-price`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "font-serif text-4xl",
              isPopular ? "text-primary" : "text-primary/90",
            )}
          >
            {pkg.price}
          </motion.p>
          <p
            className={cn(
              "text-xs tracking-[0.08em] uppercase",
              isPopular ? "text-foreground/50" : "text-foreground/40",
            )}
          >
            {pkg.duration}
          </p>
        </div>

        <h3
          className={cn(
            "mb-2 font-serif text-2xl",
            isPopular ? "text-foreground" : "text-foreground/90",
          )}
        >
          {pkg.name}
        </h3>

        {pkg.details && (
          <p
            className={cn(
              "mb-4 text-sm leading-relaxed",
              isPopular ? "text-foreground/60" : "text-foreground/55",
            )}
          >
            {pkg.details}
          </p>
        )}

        <div
          className={cn(
            "space-y-2.5 border-t pt-5",
            isPopular ? "border-foreground/12" : "border-foreground/10",
          )}
        >
          <p className="text-[11px] tracking-[0.14em] uppercase text-foreground/45">
            Includes
          </p>
          <ul className="space-y-2.5">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-content-center rounded-full border",
                    isPopular
                      ? "border-primary/40 bg-primary/15 text-primary"
                      : "border-foreground/20 bg-background text-primary",
                  )}
                >
                  <CheckCheck className="h-3 w-3" />
                </span>
                <span
                  className={cn(
                    "text-sm leading-snug",
                    isPopular ? "text-foreground/75" : "text-foreground/65",
                  )}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href={href}
        className={cn(
          "mt-8 block w-full py-3.5 text-center text-[11px] tracking-[0.18em] uppercase transition-all duration-300",
          isPopular
            ? "bg-primary text-primary-foreground hover:bg-[#d4b87a]"
            : "border border-foreground/18 text-foreground/65 hover:border-primary hover:text-primary",
        )}
      >
        Book this package
      </Link>
    </motion.article>
  );
}

function gridClassForCount(count: number) {
  if (count <= 3) return "md:grid-cols-3";
  if (count === 4) return "md:grid-cols-2 xl:grid-cols-4";
  return "md:grid-cols-2 lg:grid-cols-3";
}

export function PricingShowcase({ categories, className }: PricingShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  const activeCategory = useMemo(
    () => categories.find((cat) => cat.id === activeId) ?? categories[0],
    [activeId, categories],
  );

  if (!activeCategory) return null;

  return (
    <section ref={sectionRef} className={cn("mb-20", className)}>
      <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="mb-3 text-[11px] tracking-[0.28em] uppercase text-primary">
            Investment
          </p>
          <h2 className="mb-4 font-serif text-4xl font-light leading-tight text-foreground lg:text-5xl">
            <WordReveal text="Packages & Pricing" />
          </h2>
          <p className="text-base leading-relaxed text-foreground/58">
            Choose a session type to explore packages. Every tier includes a
            private online gallery and Lulu&apos;s signature editing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <CategorySwitch
            categories={categories}
            activeId={activeCategory.id}
            onChange={setActiveId}
          />
        </motion.div>
      </div>

      {activeCategory.note && (
        <motion.p
          key={`${activeCategory.id}-note`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 max-w-2xl text-sm italic text-foreground/50"
        >
          {activeCategory.note}
        </motion.p>
      )}

      <div className="rounded-sm border border-foreground/10 bg-gradient-to-b from-surface/90 to-background p-2 sm:p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            className={cn(
              "grid grid-cols-1 gap-3 sm:gap-4",
              gridClassForCount(activeCategory.packages.length),
            )}
          >
            {activeCategory.packages.map((pkg, index) => (
              <PricingPlanCard
                key={pkg.id}
                pkg={pkg}
                category={activeCategory.category}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
