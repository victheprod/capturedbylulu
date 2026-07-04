import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
};

export function StatCard({ label, value, hint, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "border border-foreground/10 bg-card/60 p-6 backdrop-blur-sm",
        className,
      )}
    >
      <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">
        {label}
      </p>
      <p className="mt-3 font-serif text-3xl text-foreground">{value}</p>
      {hint && <p className="mt-2 text-xs text-foreground/40">{hint}</p>}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-foreground/15 bg-card/30 px-6 py-16 text-center">
      <p className="font-serif text-xl text-foreground">{title}</p>
      <p className="mt-2 max-w-md text-sm text-foreground/45">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse bg-foreground/5", className)}
      aria-hidden
    />
  );
}

export function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-foreground/10 bg-card/50 p-6 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
