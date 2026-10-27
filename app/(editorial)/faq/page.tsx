import type { Metadata } from "next";
import { faqSections } from "@/data/faq";
import { siteImages } from "@/data/portfolio";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PageHeader } from "@/components/ui/PageHeader";
import { EstimateCTA } from "@/components/ui/EstimateCTA";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about estimates, sessions, delivery, and pricing for CapturedByLulu photography.",
  path: "/faq",
  image: siteImages.servicesBanner,
});

export default function FAQPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        tagline="Estimates, sessions, delivery, and pricing."
        title="Questions, answered plainly."
        description="If yours isn't here, send it with your estimate request and Lulu will answer by email."
        imageSrc="/site-images/portraits/DSC07888.jpg"
        imagePosition="60% 45%"
        imageAlt="Black and white portrait of a couple under a tree"
      />
      <Section innerClassName="max-w-3xl">
        <FadeIn>
          <FAQAccordion sections={faqSections} />
        </FadeIn>
      </Section>
      <EstimateCTA
        eyebrow="Still wondering?"
        title="Ask Lulu directly."
        description="Put your question in an estimate request. You'll get a real answer by email, usually within a day or two."
      />
    </>
  );
}
