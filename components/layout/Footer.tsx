import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { navLinks, siteConfig } from "@/data/site";
import { pricingNotes } from "@/data/packages";
import { Logo } from "@/components/ui/Logo";
import { formatTelHref } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-[#141210] px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2">
            <Logo size="lg" className="mb-5" />
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-foreground/55">
              Texas-based photographer specializing in weddings, portraits,
              families, and events. Every inquiry is read personally by Lulu.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-[#d4b87a]"
              >
                Book a Session
              </Link>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-2.5 text-[11px] tracking-[0.15em] uppercase text-foreground/55 transition-colors hover:border-primary hover:text-primary"
              >
                <InstagramIcon size={13} />
                {siteConfig.instagram}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex h-9 w-9 items-center justify-center border border-foreground/20 text-foreground/50 transition-all duration-300 hover:border-primary hover:text-primary"
                aria-label="Email"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[11px] tracking-[0.2em] uppercase text-primary">
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/55 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="text-sm text-foreground/55 transition-colors hover:text-foreground"
              >
                Book a Session
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[11px] tracking-[0.2em] uppercase text-primary">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-sm text-foreground/55">
                <MapPin size={13} className="mt-0.5 shrink-0 text-primary" />
                {siteConfig.location}
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-2.5 break-all text-sm text-foreground/55 transition-colors hover:text-foreground"
              >
                <Mail size={13} className="mt-0.5 shrink-0 text-primary" />
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm text-foreground/55 transition-colors hover:text-foreground"
              >
                <InstagramIcon size={13} className="mt-0.5 shrink-0 text-primary" />
                {siteConfig.instagram}
              </a>
              <a
                href={formatTelHref(siteConfig.phone)}
                className="flex items-start gap-2.5 text-sm text-foreground/55 transition-colors hover:text-foreground"
              >
                <Phone size={13} className="mt-0.5 shrink-0 text-primary" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-8 text-center lg:flex-row lg:text-left">
          <p className="text-xs text-foreground/35">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-foreground/35">
            {pricingNotes.serviceArea}
          </p>
        </div>
      </div>
    </footer>
  );
}
