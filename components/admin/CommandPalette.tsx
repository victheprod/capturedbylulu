"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Calendar,
  FileText,
  FolderOpen,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
} from "lucide-react";

const pages = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: FileText },
  { href: "/admin/portfolio", label: "Portfolio", icon: ImageIcon },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/content", label: "Website Content", icon: FileText },
  { href: "/admin/availability", label: "Availability", icon: Calendar },
  { href: "/admin/media", label: "Media Library", icon: FolderOpen },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("admin:open-command", handler);
    return () => window.removeEventListener("admin:open-command", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-background/80 p-4 pt-[15vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <Command
        className="w-full max-w-lg overflow-hidden border border-foreground/15 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command.Input
          placeholder="Search admin pages..."
          className="w-full border-b border-foreground/10 bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/30"
        />
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-foreground/40">
            No results found.
          </Command.Empty>
          {pages.map(({ href, label, icon: Icon }) => (
            <Command.Item
              key={href}
              value={label}
              onSelect={() => {
                setOpen(false);
                router.push(href);
              }}
              className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm text-foreground/70 aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Icon size={16} />
              {label}
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}

export function openCommandPalette() {
  window.dispatchEvent(new Event("admin:open-command"));
}
