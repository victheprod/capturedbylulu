import type { Metadata } from "next";
import { faqSections } from "@/data/faq";
import { siteImages } from "@/data/portfolio";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHeroBanner } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about booking, sessions, delivery, and pricing for CapturedByLulu photography in San Antonio.",
  path: "/faq",
  image: siteImages.servicesBanner,
});

export default function FAQPage() {
  return (
    <div>
      <PageHeroBanner
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Answers about booking, sessions, delivery, and pricing. Still unsure? Lulu responds to every message personally."
        imageSrc={siteImages.servicesBanner}
      />
      <div className="mx-auto max-w-4xl px-6 py-14 lg:px-10 lg:py-20">
        <FadeIn>
          <FAQAccordion sections={faqSections} />
        </FadeIn>

        <FadeIn className="mt-16 border border-foreground/10 bg-card p-10 text-center lg:p-12">
          <h2 className="mb-3 font-serif text-3xl font-light text-foreground">
            Still have questions?
          </h2>
          <p className="mx-auto mb-7 max-w-sm text-sm text-foreground/55">
            Send a message or reach out on Instagram — Lulu personally responds
            within 24–48 hours.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact">Book a Session</Button>
            <Button href="/about" variant="outline">
              About Lulu
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
