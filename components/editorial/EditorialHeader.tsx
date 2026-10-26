"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { editorialNav, editorialSecondaryNav, siteConfig } from "@/data/site";
import { Label, Wordmark, delay } from "@/components/editorial/primitives";
import { cn } from "@/lib/utils";

const mobileNav = [{ label: "Home", href: "/" }, ...editorialNav, { label: "Contact", href: "/contact" }];

export function EditorialHeader() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
        scrolled || open
          ? "border-ink/10 bg-ivory/95 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
          <span className="block h-10 w-10 overflow-hidden bg-ink md:h-11 md:w-11">
            <Image
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              className="h-full w-full scale-[1.45] object-cover"
              fetchPriority="high"
            />
          </span>
          <Wordmark className="text-lg md:text-xl" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[13px]">
            {editorialNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn("link-line pb-1", isActive(item.href) && "text-oxblood")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
            className={cn(
              "hidden items-center border border-ink px-5 py-2.5 text-[13px] font-medium transition-colors duration-500 hover:bg-ink hover:text-ivory sm:inline-flex",
              isActive("/contact") && "bg-ink text-ivory",
            )}
          >
            Request an estimate
          </Link>
          <button
            type="button"
            className="-mr-2 p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink/10 bg-ivory px-5 pt-4 pb-10 md:h-[calc(100dvh-5rem)] md:px-10 lg:hidden"
        >
          <ul>
            {mobileNav.map((item, i) => (
              <li key={item.href} className="hero-rise" style={delay(i * 45)}>
                <Link
                  href={item.href}
                  onClick={() => setOpenOn(null)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-baseline justify-between border-b border-ink/10 py-4 font-serif text-3xl font-light",
                    isActive(item.href) && "text-oxblood italic",
                  )}
                >
                  {item.label}
                  <Label className="text-ink-soft">{String(i + 1).padStart(2, "0")}</Label>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {editorialSecondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-line">
                Instagram {siteConfig.instagram}
              </a>
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-10 flex items-center justify-center bg-ink px-6 py-4 text-sm font-medium text-ivory sm:hidden"
          >
            Request an estimate
          </Link>
          <p className="mt-6 text-sm text-ink-soft">Based in Texas. Travel available.</p>
        </nav>
      )}
    </header>
  );
}
