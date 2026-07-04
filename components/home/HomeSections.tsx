import Link from "next/link";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { siteConfig, trustItems } from "@/data/site";
import {
  homePortfolioPreview,
  instagramPhotoFraming,
  siteImages,
  servicesTeaserImages,
  siteImageFraming,
} from "@/data/portfolio";
import { testimonials } from "@/data/testimonials";
import { TestimonialsMarquee } from "@/components/ui/testimonials-marquee";
import { HeroGeometric } from "@/components/ui/hero-geometric";
import { CTASection, LinkArrow } from "@/components/ui/Hero";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section, SectionDivider } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

import type { PublicPortfolioPreview } from "@/lib/cms/portfolio";
import type { PublicTestimonial } from "@/lib/cms/testimonials";

export function HomeHero({
  content,
}: {
  content?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
  };
}) {
  return (
    <HeroGeometric
      eyebrow={content?.eyebrow ?? "San Antonio, Texas"}
      title={
        content?.title ? (
          content.title
        ) : (
          <>
            Photographs that{" "}
            <em className="not-italic text-primary/90">breathe</em> with emotion
          </>
        )
      }
      subtitle={
        content?.subtitle ??
        "Luxury photography for weddings, portraits, families, and events. Every frame is crafted to tell your story."
      }
      imageSrc={siteImages.hero}
      primaryCta={{ label: "Book a Session", href: "/contact" }}
      secondaryCta={{ label: "View Portfolio", href: "/portfolio" }}
    />
  );
}

export function StoryBridge() {
  return (
    <Section tone="compact" className="relative overflow-hidden">
      <FadeIn className="mx-auto max-w-3xl text-center">
        <p className="mb-6 text-[11px] tracking-[0.3em] uppercase text-primary">
          The CapturedByLulu Philosophy
        </p>
        <blockquote className="font-serif text-2xl leading-snug font-light text-foreground sm:text-3xl lg:text-4xl lg:leading-snug">
          &ldquo;The best photographs aren&apos;t taken — they&apos;re felt. I
          create space for the in-between moments that become your most treasured
          memories.&rdquo;
        </blockquote>
        <p className="mt-8 text-[11px] tracking-[0.2em] uppercase text-foreground/40">
          — Lulu, Founder & Photographer
        </p>
      </FadeIn>
    </Section>
  );
}

export function TrustBar() {
  return (
    <section className="border-y border-foreground/10 bg-surface/50 py-5 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 lg:gap-x-14 lg:px-10">
        {trustItems.map((item) =>
          "href" in item && item.href ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-[10px] tracking-[0.16em] uppercase text-foreground/40 transition-colors hover:text-primary sm:text-[11px] sm:tracking-[0.18em]"
            >
              {item.label}
            </a>
          ) : (
            <span
              key={item.label}
              className="text-center text-[10px] tracking-[0.16em] uppercase text-foreground/40 sm:text-[11px] sm:tracking-[0.18em]"
            >
              {item.label}
            </span>
          ),
        )}
      </div>
    </section>
  );
}

export function PortfolioPreview({
  items,
}: {
  items?: PublicPortfolioPreview[];
}) {
  const preview = items ?? homePortfolioPreview.map((photo) => ({
    id: photo.id,
    label: photo.label,
    tall: photo.tall,
    imageUrl: photo.src,
    aspectRatio: photo.aspectRatio,
    objectPosition: photo.objectPosition,
  }));

  return (
    <Section>
      <FadeIn className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="The Portfolio"
          title="Stories worth telling"
        />
        <LinkArrow href="/portfolio" className="hidden shrink-0 lg:flex">
          View All
        </LinkArrow>
      </FadeIn>

      <FadeInStagger className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:[grid-auto-rows:minmax(180px,auto)]">
        {preview.map((photo, i) => (
          <FadeInItem
            key={photo.id}
            className={cn(
              "group relative overflow-hidden bg-card",
              i === 0 && "lg:row-span-2",
            )}
          >
            <Link
              href="/portfolio"
              className="relative block h-full min-h-[140px] w-full"
              style={{
                aspectRatio:
                  "aspectRatio" in photo && photo.aspectRatio
                    ? photo.aspectRatio.replace("/", " / ")
                    : i === 0
                      ? "3 / 4"
                      : "4 / 3",
              }}
            >
              <PhotoImage
                src={photo.imageUrl}
                alt={photo.label}
                width={800}
                height={1000}
                objectPosition={
                  "objectPosition" in photo ? photo.objectPosition : "50% 50%"
                }
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-end justify-between p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                <span className="text-[11px] tracking-[0.2em] uppercase text-foreground">
                  {photo.label}
                </span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-primary">
                  View
                </span>
              </div>
            </Link>
          </FadeInItem>
        ))}
      </FadeInStagger>

      <div className="mt-8 flex justify-center lg:hidden">
        <LinkArrow href="/portfolio">View All</LinkArrow>
      </div>
    </Section>
  );
}

export function AboutTeaser() {
  return (
    <>
      <SectionDivider />
      <Section>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeIn className="relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] overflow-hidden bg-card">
              <PhotoImage
                src={siteImages.aboutTeaser}
                alt="Wedding photography by CapturedByLulu — client session"
                width={800}
                height={1000}
                objectPosition={siteImageFraming.aboutTeaser.objectPosition}
              />
              <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-background/70 to-transparent px-4 py-3">
                <p className="text-[10px] tracking-[0.18em] uppercase text-foreground/80">
                  Client work · Portfolio
                </p>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 bg-primary px-5 py-3 sm:-right-4 sm:-bottom-5 sm:px-6 sm:py-4 lg:-right-8 lg:-bottom-6">
              <div className="font-serif text-3xl leading-none text-primary-foreground">
                SA
              </div>
              <div className="mt-1 text-[10px] tracking-[0.15em] uppercase text-primary-foreground/70">
                Based in San Antonio
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="About Lulu"
              title="A photographer who sees what others feel"
            />
            <p className="mt-6 leading-relaxed text-foreground/58">
              CapturedByLulu is Lulu&apos;s photography studio in San Antonio —
              specializing in weddings, portraits, family sessions, and events
              across Texas. The work is cinematic and editorial, with an eye for
              the quiet moments that matter most.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/58">
              Browse the portfolio, follow along on Instagram at{" "}
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-colors hover:text-foreground"
              >
                {siteConfig.instagram}
              </a>
              , or reach out to start planning your session.
            </p>
            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-primary transition-all duration-300 hover:gap-4"
            >
              Read My Story <ArrowRight size={13} />
            </Link>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}

export function TestimonialsSection({
  testimonials: propTestimonials,
}: {
  testimonials?: PublicTestimonial[];
}) {
  const items = propTestimonials ?? testimonials;
  if (!items.length) return null;

  const marqueeItems = items.map((t) => ({
    author: { name: t.name, role: t.type },
    text: t.quote,
    stars: t.stars,
  }));

  return (
    <>
      <SectionDivider />
      <Section
        tone="surface"
        bordered
        className="px-0 lg:px-0"
        innerClassName="max-w-none"
      >
        <FadeIn>
          <TestimonialsMarquee testimonials={marqueeItems} />
        </FadeIn>
      </Section>
    </>
  );
}

export function ServicesTeaser() {
  const services = servicesTeaserImages;

  return (
    <>
      <SectionDivider />
      <Section>
        <FadeIn className="mb-10 text-center">
          <SectionHeading
            eyebrow="Services"
            title="What I photograph"
            align="center"
          />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-foreground/55">
            Weddings, portraits, families, and events — each session is tailored
            to you. Explore a category or view the full portfolio.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {services.map((item) => (
            <FadeInItem key={item.label}>
              <Link
                href={item.href}
                className="group relative block overflow-hidden bg-card"
                style={{ aspectRatio: item.aspectRatio.replace("/", " / ") }}
              >
                <PhotoImage
                  src={item.src}
                  alt={item.label}
                  width={600}
                  height={800}
                  objectPosition={item.objectPosition}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 transition-opacity duration-400 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 left-0 p-5">
                  <p className="font-serif text-xl text-foreground">
                    {item.label}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] tracking-wider text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Explore <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <FadeIn className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <LinkArrow href="/services">View Pricing</LinkArrow>
          <LinkArrow href="/portfolio">Full Portfolio</LinkArrow>
        </FadeIn>
      </Section>
    </>
  );
}

export function InstagramSection() {
  return (
    <>
      <SectionDivider />
      <Section tone="surface" bordered>
        <FadeIn className="mb-10 text-center">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block transition-opacity hover:opacity-80"
          >
            <div className="mb-2.5 flex items-center justify-center gap-2">
              <InstagramIcon size={15} className="text-primary" />
              <p className="text-[11px] tracking-[0.25em] uppercase text-primary">
                {siteConfig.instagram}
              </p>
            </div>
            <h2 className="font-serif text-3xl font-light text-foreground lg:text-4xl">
              Follow along on Instagram
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/55">
              Recent work, behind-the-scenes, and session highlights — updated
              regularly at{" "}
              <span className="text-foreground/75">{siteConfig.instagram}</span>
            </p>
          </a>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-3 gap-1.5 lg:grid-cols-9">
          {instagramPhotoFraming.map(({ src, objectPosition }) => (
            <FadeInItem key={src}>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-square overflow-hidden bg-card"
              >
                <PhotoImage
                  src={src}
                  alt="Photography by CapturedByLulu on Instagram"
                  width={300}
                  height={300}
                  objectPosition={objectPosition}
                  className="transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
                />
              </a>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <FadeIn className="mt-10 text-center">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-primary transition-colors hover:text-foreground"
          >
            View on Instagram <ArrowRight size={13} />
          </a>
        </FadeIn>
      </Section>
    </>
  );
}

export function HomeCTA({
  content,
}: {
  content?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
  };
}) {
  return (
    <CTASection
      eyebrow={content?.eyebrow ?? "Let's Create Together"}
      title={content?.title ?? "Ready to tell your story?"}
      description={
        content?.description ??
        "Reach out to check availability, ask a question, or start planning your session with Lulu."
      }
      ctaLabel={content?.ctaLabel ?? "Book a Session"}
      ctaHref="/contact"
      imageSrc={siteImages.cta}
    />
  );
}
