"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import {
  mobileNavGroups,
  navLinks,
  siteConfig,
} from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ShiftingServicesDropdown } from "@/components/ui/shifting-services-dropdown";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollProgress(Math.min(latest / 120, 1));
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const showSolidNav = scrollProgress > 0.05 || menuOpen;

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: showSolidNav
          ? `rgba(28, 24, 20, ${0.72 + scrollProgress * 0.2})`
          : "rgba(28, 24, 20, 0)",
        borderBottomColor: showSolidNav
          ? `rgba(242, 236, 224, ${0.06 + scrollProgress * 0.06})`
          : "rgba(242, 236, 224, 0)",
        boxShadow: showSolidNav
          ? `0 1px ${24 + scrollProgress * 16}px rgba(0, 0, 0, ${0.25 + scrollProgress * 0.15})`
          : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backdropFilter: showSolidNav
          ? `blur(${8 + scrollProgress * 12}px) saturate(1.2)`
          : "blur(0px)",
      }}
      className="fixed top-0 right-0 left-0 z-50 border-b"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-[4.25rem] lg:px-10">
        <motion.div
          animate={{ scale: showSolidNav ? 0.96 : 1 }}
          transition={{ duration: 0.35 }}
        >
          <Logo size="md" />
        </motion.div>

        <div className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navLinks.slice(0, 1).map((link) => (
            <NavLink key={link.href} href={link.href} pathname={pathname}>
              {link.label}
            </NavLink>
          ))}

          <ShiftingServicesDropdown />

          {navLinks.slice(1).map((link) => (
            <NavLink key={link.href} href={link.href} pathname={pathname}>
              {link.label}
            </NavLink>
          ))}

          <Link
            href="/contact"
            className="ml-1 border border-primary px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground xl:ml-2"
          >
            Book Now
          </Link>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center border border-foreground/20 text-foreground/55 transition-all duration-300 hover:border-primary hover:text-primary"
            aria-label={`Instagram ${siteConfig.instagram}`}
          >
            <InstagramIcon size={15} />
          </a>
        </div>

        <button
          type="button"
          className="p-1 text-foreground lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-foreground/10 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex max-h-[calc(100dvh-4rem)] flex-col gap-2 overflow-y-auto px-6 py-6">
              {mobileNavGroups.map((group) => (
                <MobileNavGroup key={group.title} group={group} pathname={pathname} />
              ))}
              <Link
                href="/contact"
                className="mt-4 w-full bg-primary px-5 py-3.5 text-center text-[11px] tracking-[0.18em] uppercase text-primary-foreground"
              >
                Book Now
              </Link>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-foreground/15 py-3 text-[11px] tracking-[0.18em] uppercase text-foreground/65"
              >
                <InstagramIcon size={14} />
                {siteConfig.instagram}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: ReactNode;
}) {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative text-[11px] tracking-[0.18em] uppercase transition-colors duration-300",
        active ? "text-primary" : "text-foreground/65 hover:text-foreground",
      )}
    >
      {children}
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute -bottom-1.5 left-0 h-px w-full bg-primary"
        />
      )}
    </Link>
  );
}

function MobileNavGroup({
  group,
  pathname,
}: {
  group: (typeof mobileNavGroups)[number];
  pathname: string;
}) {
  const hasActive = group.links.some((l) => pathname === l.href);
  const [open, setOpen] = useState(hasActive);

  return (
    <div className="border-b border-foreground/10 pb-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-left text-[11px] tracking-[0.2em] uppercase text-foreground/55"
      >
        {group.title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 pb-2 pl-1">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm tracking-[0.12em] uppercase transition-colors",
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground/75 hover:text-primary",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
