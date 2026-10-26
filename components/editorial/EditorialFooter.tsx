import Link from "next/link";
import { editorialNav, editorialSecondaryNav, siteConfig } from "@/data/site";
import { Label, Wordmark } from "@/components/editorial/primitives";

const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

export function EditorialFooter() {
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 gap-y-10 px-5 py-16 md:px-10">
        <div className="col-span-12 md:col-span-5">
          <Wordmark className="text-3xl text-ivory" accent="text-brass" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Photographer based in Texas, available throughout the state and for travel nationwide.
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ivory/55">
            Estimates go to Lulu by email. Nothing is booked online.
          </p>
        </div>

        <nav aria-label="Footer" className="col-span-12 sm:col-span-6 md:col-span-3">
          <ul className="space-y-2 text-sm">
            {[...editorialNav, ...editorialSecondaryNav, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-12 space-y-2 text-sm sm:col-span-6 md:col-span-4">
          <a href={`mailto:${siteConfig.email.toLowerCase()}`} className="link-line block w-fit">
            {siteConfig.email}
          </a>
          <a href={phoneHref} className="link-line block w-fit">
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line block w-fit"
          >
            Instagram {siteConfig.instagram}
          </a>
          <Link href="/contact?quote=custom" className="link-line block w-fit pt-4 text-ivory">
            Ask for a custom quote
          </Link>
        </div>

        <div className="col-span-12 flex flex-wrap justify-between gap-4 border-t border-ivory/15 pt-6 text-ivory/50">
          <Label>&copy; {new Date().getFullYear()} {siteConfig.name}</Label>
          <Label>Weddings &middot; Portraits &middot; Families &middot; Events</Label>
        </div>
      </div>
    </footer>
  );
}
