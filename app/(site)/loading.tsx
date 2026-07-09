import { Logo } from "@/components/ui/Logo";

export default function SiteLoading() {
  return (
    <div
      className="flex min-h-[60dvh] flex-col items-center justify-center gap-8 bg-background"
      role="status"
      aria-label="Loading page"
    >
      <Logo href="" className="h-10 w-10 opacity-90" size="sm" />
      <div className="flex w-28 flex-col items-center gap-3">
        <div className="h-px w-full overflow-hidden bg-foreground/10">
          <span className="block h-full w-full bg-primary/70 animate-loader-draw" />
        </div>
        <span className="text-[10px] tracking-[0.35em] uppercase text-foreground/35">
          Loading
        </span>
      </div>
    </div>
  );
}
