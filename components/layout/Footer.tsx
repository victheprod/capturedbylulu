import Link from "next/link";
import { mobileNavGroups, siteConfig } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { formatTelHref } from "@/lib/utils";

const contactLinks = [
  { label: "Get an estimate", href: "/contact" },
  { label: siteConfig.instagram, href: siteConfig.instagramUrl, external: true },
  { label: siteConfig.email, href: `mailto:${siteConfig.email.toLowerCase()}` },
  { label: siteConfig.phone, href: formatTelHref(siteConfig.phone) },
];

/** Adapted from 21st.dev "Minimal Two-Column Footer". */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-[#141210]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-xs flex-col gap-5">
            <Logo size="lg" />
            <p className="text-sm leading-relaxed text-foreground/55">
              Weddings, portraits, families, and events, photographed by Lulu
              across Texas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {mobileNavGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="mb-4 text-[11px] font-medium tracking-[0.24em] uppercase text-foreground/40">
                  {group.title}
                </p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/70 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-4 text-[11px] font-medium tracking-[0.24em] uppercase text-foreground/40">
                Contact
              </p>
              <ul className="space-y-2.5">
                {contactLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="break-all text-sm text-foreground/70 transition-colors hover:text-primary sm:break-normal"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-foreground/10 pt-6 text-xs text-foreground/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {siteConfig.name}</p>
          <p>Based in Texas · Travels nationwide · Estimates only, nothing booked online</p>
        </div>
      </div>
    </footer>
  );
}
