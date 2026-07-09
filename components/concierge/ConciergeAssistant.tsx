"use client";

import { usePathname } from "next/navigation";
import { ConciergeFloatingButton } from "@/components/concierge/ConciergeFloatingButton";
import { ConciergeSheet } from "@/components/concierge/ConciergeSheet";

const HIDE_FAB_PATHS = ["/concierge", "/contact"];

export function ConciergeAssistant() {
  const pathname = usePathname();
  const hideFab = HIDE_FAB_PATHS.some((path) => pathname === path);

  return (
    <>
      {!hideFab ? <ConciergeFloatingButton /> : null}
      <ConciergeSheet />
    </>
  );
}
