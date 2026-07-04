import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <FadeIn className="mb-16">
      <div className="mb-8 flex items-center gap-5">
        <h2 className="font-serif text-2xl text-foreground">
          {section.category}
        </h2>
        <div className="h-px flex-1 bg-foreground/10" />
        {section.linkHref && (
          <Link
            href={section.linkHref}
            className="flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-primary transition-colors hover:text-[#d4b87a]"
          >
            {section.linkLabel} <ArrowRight size={12} />
          </Link>
        )}
      </div>

      {section.note && (
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-foreground/50 italic">
          {section.note}
        </p>
      )}

      <div className={`grid gap-4 ${gridClass}`}>
        {section.packages.map((pkg) => (
          <PricingCard
            key={pkg.id}
            pkg={pkg}
            category={section.category}
          />
        ))}
      </div>
    </FadeIn>
  );
}
