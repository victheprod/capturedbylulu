import type { Metadata } from "next";
import { faqSections } from "@/data/faq";
import { siteImages } from "@/data/portfolio";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageEditorialIntro } from "@/components/ui/PageEditorialIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about booking, sessions, delivery, and pricing for CapturedByLulu photography.",
  path: "/faq",
  image: siteImages.servicesBanner,
});

export default function FAQPage() {
  return (
    <div>
      <PageEditorialIntro
        eyebrow="Questions"
        title="Everything you're wondering — answered plainly."
        description="Booking, sessions, delivery, and pricing. Still unsure? Lulu responds to every message personally."
      />
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-20">
        <FadeIn>
          <FAQAccordion sections={faqSections} />
        </FadeIn>

        <FadeIn className="mt-20 border-t border-foreground/10 pt-16 text-center">
          <h2 className="mb-3 font-serif text-3xl font-light text-foreground">
            Still have questions?
          </h2>
          <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-foreground/55">
            Send a message or reach out on Instagram — Lulu personally responds
            within 24–48 hours.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact">Begin your inquiry</Button>
            <Button href="/about" variant="outline">
              About Lulu
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
