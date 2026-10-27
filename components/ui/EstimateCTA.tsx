import Link from "next/link";
import { siteConfig } from "@/data/site";
import { EstimateButton, Label, delay } from "@/components/editorial/primitives";

const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

type EstimateCTAProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/** Oxblood closing band shared by the inner pages. */
export function EstimateCTA({
  eyebrow = "Estimates",
  title = "Tell Lulu what you're planning.",
  description = "Send the date, the place, and the idea. Lulu replies by email with a price, usually within a day or two. Nothing is booked until you both agree.",
  ctaLabel = "Request an estimate",
  ctaHref = "/contact",
}: EstimateCTAProps) {
  return (
    <section aria-labelledby="estimate-cta-heading" className="bg-oxblood text-ivory">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 gap-y-12 px-5 py-24 md:px-10 md:py-32">
        <div className="col-span-12 lg:col-span-7">
          <Label className="reveal block text-ivory/75">{eyebrow}</Label>
          <h2
            id="estimate-cta-heading"
            className="reveal mt-6 font-serif text-[12vw] leading-[0.95] font-light tracking-[-0.03em] text-balance md:text-[7vw] xl:text-[6.5rem]"
            style={delay(100)}
          >
            {title}
          </h2>
        </div>

        <div className="reveal col-span-12 flex flex-col items-start gap-8 lg:col-span-4 lg:col-start-9 lg:self-end" style={delay(200)}>
          <p className="max-w-md text-lg leading-relaxed text-ivory/85">{description}</p>
          <EstimateButton href={ctaHref} tone="light">
            {ctaLabel}
          </EstimateButton>
          <div className="flex flex-col gap-1 text-sm">
            <Link href="/contact?quote=custom" className="link-line w-fit font-medium">
              Or ask for a custom quote
            </Link>
            <a href={`mailto:${siteConfig.email.toLowerCase()}`} className="link-line w-fit text-ivory/80">
              {siteConfig.email}
            </a>
            <a href={phoneHref} className="link-line w-fit text-ivory/80">
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
