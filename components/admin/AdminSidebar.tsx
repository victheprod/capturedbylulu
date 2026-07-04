"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Calendar,
  Camera,
  FileText,
  FolderOpen,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: FileText },
  { href: "/admin/portfolio", label: "Portfolio", icon: ImageIcon },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/content", label: "Content", icon: Camera },
  { href: "/admin/availability", label: "Availability", icon: Calendar },
  { href: "/admin/media", label: "Media", icon: FolderOpen },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-foreground/10 bg-surface/80 backdrop-blur-xl lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-foreground/10 px-6 py-6">
          <Link href="/admin" className="block">
            <p className="text-[10px] tracking-[0.25em] uppercase text-primary">
              CapturedByLulu
            </p>
            <p className="mt-1 font-serif text-xl text-foreground">Admin</p>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-200",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/55 hover:bg-foreground/5 hover:text-foreground",
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-foreground/10 p-4">
          <Link
            href="/"
            className="text-xs tracking-wide text-foreground/45 transition-colors hover:text-primary"
          >
            ← View public site
          </Link>
        </div>
      </div>
    </aside>
  );
}
