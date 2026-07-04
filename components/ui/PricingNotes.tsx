import { pricingNotes } from "@/data/packages";
import { cn } from "@/lib/utils";

type PricingNotesProps = {
  className?: string;
  showServiceArea?: boolean;
  showDeposit?: boolean;
};

export function PricingNotes({
  className,
  showServiceArea = true,
  showDeposit = true,
}: PricingNotesProps) {
  return (
    <div
      className={cn(
        "space-y-2 border border-foreground/10 bg-card/50 px-5 py-4 text-sm leading-relaxed text-foreground/55",
        className,
      )}
    >
      {showServiceArea && <p>{pricingNotes.serviceArea}</p>}
      {showDeposit && <p>{pricingNotes.deposit}</p>}
    </div>
  );
}
