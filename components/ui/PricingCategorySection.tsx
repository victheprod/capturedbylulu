import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PackageCategory } from "@/data/packages";
import { getGridColsClass } from "@/data/packages";
import { PricingCard } from "@/components/ui/PricingCard";
import { FadeIn } from "@/components/ui/FadeIn";

type PricingCategorySectionProps = {
  section: PackageCategory;
};

export function PricingCategorySection({ section }: PricingCategorySectionProps) {
  const gridClass = getGridColsClass(section.packages.length);

  return (
    <FadeIn className="mb-20 last:mb-0">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-ink/15 pb-4">
        <h3 className="font-serif text-3xl font-light md:text-4xl">{section.category}</h3>
        {section.linkHref && (
          <Link
            href={section.linkHref}
            className="group inline-flex items-center gap-2 text-sm font-medium"
          >
            <span className="link-line pb-1">{section.linkLabel}</span>
            <ArrowUpRight size={14} className="text-oxblood" aria-hidden />
          </Link>
        )}
      </div>

      {section.note && (
        <p className="mb-8 max-w-2xl font-serif text-lg leading-relaxed italic text-ink-soft">
          {section.note}
        </p>
      )}

      <div className={`grid gap-4 md:gap-6 ${gridClass}`}>
        {section.packages.map((pkg) => (
          <PricingCard key={pkg.id} pkg={pkg} category={section.category} />
        ))}
      </div>
    </FadeIn>
  );
}
