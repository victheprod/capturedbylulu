"use client";

import { usePathname } from "next/navigation";
import { ConciergeFloatingButton } from "@/components/concierge/ConciergeFloatingButton";
import { ConciergeSheet } from "@/components/concierge/ConciergeSheet";

export function ConciergeAssistant() {
  const pathname = usePathname();
  const hideOnConciergePage = pathname === "/concierge";

  return (
    <>
      {!hideOnConciergePage ? <ConciergeFloatingButton /> : null}
      <ConciergeSheet />
    </>
  );
}
