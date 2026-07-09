import { cn } from "@/lib/utils";

type EditorialDividerProps = {
  className?: string;
  tone?: "default" | "inverted";
};

export function EditorialDivider({
  className,
  tone = "default",
}: EditorialDividerProps) {
  return (
    <div
      className={cn("mx-auto max-w-7xl px-6 lg:px-10", className)}
      aria-hidden
    >
      <div
        className={cn(
          "h-px w-full",
          tone === "inverted"
            ? "bg-gradient-to-r from-transparent via-foreground/8 to-transparent"
            : "bg-gradient-to-r from-transparent via-primary/25 to-transparent",
        )}
      />
    </div>
  );
}
