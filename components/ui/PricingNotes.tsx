import { pricingNotes } from "@/data/packages";
import { Label } from "@/components/editorial/primitives";
import { cn } from "@/lib/utils";

type PricingNotesProps = {
  className?: string;
  showServiceArea?: boolean;
  showDeposit?: boolean;
  showTravel?: boolean;
};

export function PricingNotes({
  className,
  showServiceArea = true,
  showDeposit = true,
  showTravel = true,
}: PricingNotesProps) {
  const notes = [
    showServiceArea && pricingNotes.serviceArea,
    showTravel && pricingNotes.travel,
    showDeposit && pricingNotes.deposit,
  ].filter(Boolean) as string[];

  return (
    <aside className={cn("border-t border-ink/15 pt-5", className)} aria-label="Pricing notes">
      <Label className="text-oxblood">Good to know</Label>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
        {notes.map((note) => (
          <li key={note} className="flex gap-3">
            <span className="mt-[0.6em] h-px w-3 shrink-0 bg-ink/40" aria-hidden />
            {note}
          </li>
        ))}
      </ul>
    </aside>
  );
}
