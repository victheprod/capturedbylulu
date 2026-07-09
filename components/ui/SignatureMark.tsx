import { cn } from "@/lib/utils";

type SignatureMarkProps = {
  className?: string;
  label?: string;
  variant?: "default" | "floating";
};

/** Recognizable brand moment — gold rule + monogram */
export function SignatureMark({
  className,
  label = "CapturedByLulu",
  variant = "default",
}: SignatureMarkProps) {
  return (
    <div
      className={cn(
        "relative z-20 flex items-center justify-center gap-5",
        variant === "default" && "py-10 lg:py-14",
        variant === "floating" &&
          "-my-6 py-4 lg:-my-10 lg:py-6",
        className,
      )}
      aria-hidden
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40 sm:w-20" />
      <span className="font-serif text-[10px] tracking-[0.45em] uppercase text-primary/55 sm:text-[11px]">
        {label}
      </span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40 sm:w-20" />
    </div>
  );
}
