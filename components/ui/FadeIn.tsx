import { delay as delayVar } from "@/components/editorial/primitives";
import { cn } from "@/lib/utils";

type FadeInProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Seconds, matching the original framer-motion API. */
  delay?: number;
};

/** Scroll reveal driven by `RevealObserver`; content stays visible without JavaScript. */
export function FadeIn({ children, className, delay = 0, style, ...props }: FadeInProps) {
  return (
    <div
      className={cn("reveal", className)}
      style={delay ? { ...delayVar(delay * 1000), ...style } : style}
      {...props}
    >
      {children}
    </div>
  );
}

/** Children rendered with `FadeInItem` reveal in a short cascade. */
export function FadeInStagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal-stagger", className)}>{children}</div>;
}

export function FadeInItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
