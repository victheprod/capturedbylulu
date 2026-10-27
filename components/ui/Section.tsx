import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  tone?: "default" | "surface" | "compact";
  bordered?: boolean;
};

const toneStyles = {
  default: "py-20 md:py-32",
  surface: "bg-surface py-20 md:py-32",
  compact: "py-14 md:py-20",
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
        "px-5 md:px-10",
        toneStyles[tone],
        bordered && "border-y border-foreground/10",
        className,
      )}
    >
      <div className={cn("mx-auto max-w-[1520px]", innerClassName)}>{children}</div>
    </section>
  );
}
