"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

type AdminHeaderProps = {
  title: string;
  subtitle?: string;
  onOpenMobileNav?: () => void;
  onOpenCommand?: () => void;
};

export function AdminHeader({
  title,
  subtitle,
  onOpenMobileNav,
  onOpenCommand,
}: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="p-1 text-foreground lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-light text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-foreground/45">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommand}
            className={cn(
              "hidden items-center gap-2 border border-foreground/15 px-3 py-2 text-xs text-foreground/45 sm:flex",
            )}
          >
            <Search size={14} />
            Search
            <kbd className="ml-2 border border-foreground/15 px-1.5 py-0.5 text-[10px]">
              ⌘K
            </kbd>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 border border-foreground/15 px-3 py-2 text-xs tracking-wide uppercase text-foreground/55 transition-colors hover:border-primary hover:text-primary"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
