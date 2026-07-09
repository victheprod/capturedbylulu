import { Logo } from "@/components/ui/Logo";

export default function SiteLoading() {
  return (
    <div
      className="flex min-h-[60dvh] flex-col items-center justify-center gap-6 bg-background"
      role="status"
      aria-label="Loading page"
    >
      <Logo href="" className="h-10 w-10 opacity-80" size="sm" />
      <div className="flex items-center gap-2">
        <span className="h-1 w-1 animate-pulse rounded-full bg-primary/60 [animation-delay:0ms]" />
        <span className="h-1 w-1 animate-pulse rounded-full bg-primary/60 [animation-delay:150ms]" />
        <span className="h-1 w-1 animate-pulse rounded-full bg-primary/60 [animation-delay:300ms]" />
      </div>
    </div>
  );
}
