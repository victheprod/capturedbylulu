import type { Metadata } from "next";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { getPublicWeddingCategories } from "@/lib/cms/packages";
import { CinematicHero, CTASection } from "@/components/ui/Hero";
import { PricingCategorySection } from "@/components/ui/PricingCategorySection";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteImages, siteImageFraming } from "@/data/portfolio";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Wedding Photography",
  description:
    "Wedding and pre-wedding photography in San Antonio. Collections from intimate ceremonies to full-day celebrations.",
  path: "/weddings",
  image: siteImages.weddingsBanner,
});

const processSteps = [
  {
    step: "01",
    title: "Inquiry & Connection",
    desc: "We start with a conversation — about you, your vision, your love story. No pressure, just genuine connection and making sure we're the right fit.",
  },
  {
    step: "02",
    title: "Pre-Wedding Session",
    desc: "Celebrate your love story before the big day. Pre-wedding and engagement sessions help you feel comfortable in front of the camera.",
  },
  {
    step: "03",
    title: "Your Wedding Day",
    desc: "I arrive early, stay late, and capture everything in between with a calm presence and intuitive eye. You'll barely notice I'm there.",
  },
  {
    step: "04",
    title: "Gallery Delivery",
    desc: "Your fully edited gallery is delivered within 4–6 weeks — beautifully curated, ready to view, download, share, and print.",
  },
];

export default async function WeddingsPage() {
  const weddingsPageCategories = await getPublicWeddingCategories();
  return (
    <>
      <CinematicHero
        eyebrow="Wedding Photography"
        title={
          <>
            Your love story,{" "}
            <em className="not-italic text-primary/90">beautifully told</em>
          </>
        }
        imageSrc={siteImages.weddingsBanner}
        fullScreen={false}
      />

      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeIn>
            <p className="mb-7 font-serif text-2xl font-light italic leading-relaxed text-foreground lg:text-3xl">
              &ldquo;A wedding photograph should feel like a whisper — intimate,
              honest, and unforgettable.&rdquo;
            </p>
            <p className="mb-4 leading-relaxed text-foreground/58">
              Lulu approaches every wedding as a visual love story — weaving
              together the grand moments and the quiet ones, the laughter and the
              tears, the chaos and the stillness.
            </p>
            <p className="leading-relaxed text-foreground/58">
              With a documentary heart and an editorial eye, she captures the
              truth of your day while crafting imagery that feels completely
              timeless.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-2 gap-3">
            <FadeInItem className="aspect-[3/4] overflow-hidden bg-card">
              <PhotoImage
                src={siteImages.weddingsDetail1}
                alt="Wedding photography by Lulu"
                width={600}
                height={800}
                objectPosition={siteImageFraming.weddingsDetail1.objectPosition}
              />
            </FadeInItem>
            <FadeInItem className="mt-12 aspect-[3/4] overflow-hidden bg-card">
              <PhotoImage
                src={siteImages.weddingsDetail2}
                alt="Wedding ceremony photography"
                width={600}
                height={800}
                objectPosition={siteImageFraming.weddingsDetail2.objectPosition}
              />
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-surface px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-10 text-center">
            <SectionHeading
              eyebrow="Investment"
              title="Wedding & Pre-Wedding Packages"
              align="center"
            />
          </FadeIn>
          <FadeIn className="mb-12">
            <PricingNotes />
          </FadeIn>
          {weddingsPageCategories.map((section) => (
            <PricingCategorySection key={section.id} section={section} />
          ))}
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <FadeIn className="mb-14 text-center">
            <SectionHeading
              eyebrow="The Experience"
              title="What to expect"
              align="center"
            />
          </FadeIn>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 hidden w-px bg-primary/25 lg:block" />
            {processSteps.map((item) => (
              <FadeIn
                key={item.step}
                className="relative mb-10 flex gap-8 lg:pl-16"
              >
                <div className="absolute left-0 hidden h-12 w-12 shrink-0 items-center justify-center border border-primary/45 bg-background lg:flex">
                  <span className="text-[11px] text-primary">{item.step}</span>
                </div>
                <div className="flex-1 border-b border-foreground/8 pb-8 last:border-0">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-[11px] text-primary lg:hidden">
                      {item.step}
                    </span>
                    <h3 className="font-serif text-xl text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/58">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Limited Availability"
        title="Dates are limited"
        description="Lulu books only a select number of weddings each year to ensure every couple receives her complete focus and creative dedication."
        ctaLabel="Check Availability"
        ctaHref="/contact"
        imageSrc={siteImages.weddingsBanner}
      />
    </>
  );
}
