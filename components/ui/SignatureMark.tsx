import { cn } from "@/lib/utils";

type SignatureMarkProps = {
  className?: string;
  label?: string;
};

/** Recognizable brand moment — gold rule + monogram */
export function SignatureMark({
  className,
  label = "CapturedByLulu",
}: SignatureMarkProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-5 py-10 lg:py-14",
        className,
      )}
      aria-hidden
    >
      <span className="h-px w-16 bg-primary/35 sm:w-24" />
      <span className="font-serif text-[11px] tracking-[0.45em] uppercase text-primary/60">
        {label}
      </span>
      <span className="h-px w-16 bg-primary/35 sm:w-24" />
    </div>
  );
}
