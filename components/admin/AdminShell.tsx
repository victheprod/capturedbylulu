"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { CommandPalette } from "@/components/admin/CommandPalette";
import { openCommandPalette } from "@/components/admin/CommandPalette";
import { cn } from "@/lib/utils";

export function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      {mobileNav && (
        <div
          className="fixed inset-0 z-50 bg-background/90 lg:hidden"
          onClick={() => setMobileNav(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AdminSidebar />
          </div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onOpenMobileNav={() => setMobileNav(true)}
          onOpenCommand={openCommandPalette}
        />
        <main className={cn("flex-1 px-4 py-6 lg:px-8 lg:py-8")}>
          {children}
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
