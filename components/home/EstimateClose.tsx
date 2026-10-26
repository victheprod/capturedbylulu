import type { ReactNode } from "react";
import Link from "next/link";
import { estimateSteps } from "@/data/home";
import { siteConfig } from "@/data/site";
import { EstimateButton, Label, delay } from "@/components/editorial/primitives";

const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

type EstimateCloseProps = {
  eyebrow: string;
  title?: string;
  ctaLabel: string;
};

const defaultTitle: ReactNode = (
  <>
    Your turn
    <br />
    <em className="italic">in front of</em> the lens.
  </>
);

export function EstimateClose({ eyebrow, title, ctaLabel }: EstimateCloseProps) {
  return (
    <section aria-labelledby="close-title" className="bg-oxblood text-ivory">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <Label className="reveal block">{eyebrow}</Label>
        <h2
          id="close-title"
          className="reveal mt-6 font-serif text-[15vw] leading-[0.9] font-light tracking-[-0.03em] md:text-[10vw] xl:text-[9.5rem]"
          style={delay(100)}
        >
          {title || defaultTitle}
        </h2>

        <ol className="mt-16 grid gap-10 border-t border-ivory/30 pt-10 md:mt-24 md:grid-cols-3 md:gap-6">
          {estimateSteps.map((step, i) => (
            <li key={step.title} className="reveal" style={delay(i * 120)}>
              <Label className="text-ivory/70">Step {String(i + 1).padStart(2, "0")}</Label>
              <p className="mt-3 font-serif text-3xl">{step.title}</p>
              <p className="mt-3 max-w-xs leading-relaxed text-ivory/80">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="reveal mt-16 flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
          <EstimateButton tone="light">{ctaLabel}</EstimateButton>
          <div className="flex flex-col gap-1 text-sm">
            <Link href="/contact?quote=custom" className="link-line w-fit font-medium">
              Planning something unusual? Ask for a custom quote
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
