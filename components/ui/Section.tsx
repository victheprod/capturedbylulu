import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  tone?: "default" | "surface" | "compact" | "hero-offset";
  bordered?: boolean;
};

const toneStyles = {
  default: "py-24 lg:py-36",
  surface: "bg-surface py-24 lg:py-36",
  compact: "py-16 lg:py-24",
  "hero-offset": "pt-24 pb-24 lg:pt-28 lg:pb-36",
};

export function Section({
  children,
  className,
  innerClassName,
  id,
  tone = "default",
  bordered = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-6 lg:px-10",
        toneStyles[tone],
        bordered && "border-y border-foreground/10",
        className,
      )}
    >
      <div className={cn("mx-auto max-w-7xl", innerClassName)}>{children}</div>
    </section>
  );
}

export function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </div>
  );
}
