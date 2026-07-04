"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { servicesNavTabs, servicePaths } from "@/data/site";
import { cn } from "@/lib/utils";

type TabId = (typeof servicesNavTabs)[number]["id"];

export function ShiftingServicesDropdown() {
  const [selected, setSelected] = useState<TabId | null>(null);
  const [dir, setDir] = useState<"l" | "r" | null>(null);
  const pathname = usePathname();
  const menuId = useId();

  const isServiceActive = servicePaths.some((p) => pathname.startsWith(p));

  const handleSetSelected = (val: TabId | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  };

  useEffect(() => {
    setSelected(null);
    setDir(null);
  }, [pathname]);

  return (
    <div
      className="relative hidden lg:block"
      onMouseLeave={() => handleSetSelected(null)}
    >
      <button
        type="button"
        id={`${menuId}-trigger`}
        aria-expanded={selected !== null}
        aria-haspopup="true"
        onMouseEnter={() => handleSetSelected(servicesNavTabs[0].id)}
        onClick={() =>
          handleSetSelected(
            selected ? null : servicesNavTabs[0].id,
          )
        }
        className={cn(
          "relative flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase transition-colors duration-300",
          selected !== null || isServiceActive
            ? "text-primary"
            : "text-foreground/65 hover:text-foreground",
        )}
      >
        Services
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300",
            selected !== null && "rotate-180",
          )}
        />
        {isServiceActive && !selected && (
          <span className="absolute -bottom-1.5 left-3 right-3 h-px bg-primary" />
        )}
      </button>

      <AnimatePresence>
        {selected !== null && (
          <DropdownPanel
            menuId={menuId}
            selected={selected}
            dir={dir}
            onSelectTab={handleSetSelected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownPanel({
  menuId,
  selected,
  dir,
  onSelectTab,
}: {
  menuId: string;
  selected: TabId;
  dir: "l" | "r" | null;
  onSelectTab: (id: TabId) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [nubLeft, setNubLeft] = useState(0);

  useLayoutEffect(() => {
    const tab = document.getElementById(`${menuId}-tab-${selected}`);
    const panel = panelRef.current;
    if (!tab || !panel) return;
    const tabRect = tab.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    setNubLeft(tabRect.left + tabRect.width / 2 - panelRect.left);
  }, [selected, menuId]);

  const activeTab = servicesNavTabs.find((t) => t.id === selected);

  return (
    <motion.div
      ref={panelRef}
      id={`${menuId}-panel`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-[calc(100%+20px)] left-1/2 z-50 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 rounded-sm border border-foreground/12 bg-card/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <div className="absolute -top-6 left-0 right-0 h-6" aria-hidden />

      <motion.span
        aria-hidden
        animate={{ left: nubLeft }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-foreground/12 bg-card/95"
        style={{ left: nubLeft }}
      />

      <div className="mb-4 flex gap-1 border-b border-foreground/10 pb-3">
        {servicesNavTabs.map((tab) => (
          <button
            key={tab.id}
            id={`${menuId}-tab-${tab.id}`}
            type="button"
            onMouseEnter={() => onSelectTab(tab.id)}
            onClick={() => onSelectTab(tab.id)}
            className={cn(
              "rounded-full px-3 py-1 text-[10px] tracking-[0.14em] uppercase transition-colors",
              selected === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-foreground/50 hover:text-foreground/80",
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab && (
          <motion.ul
            key={activeTab.id}
            initial={{
              opacity: 0,
              x: dir === "l" ? 24 : dir === "r" ? -24 : 0,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === "l" ? -12 : 12 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            {activeTab.links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="group block rounded-sm px-2 py-2.5 transition-colors hover:bg-foreground/[0.04]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-foreground">
                      {link.label}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-foreground/45">
                    {link.description}
                  </p>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
