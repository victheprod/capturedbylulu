import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { siteConfig } from "@/data/site";
import { siteImages, siteImageFraming } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { AboutStoryChapters } from "@/components/about/AboutStoryChapters";
import { AboutVisualStory } from "@/components/about/AboutVisualStory";
import { SignatureMark } from "@/components/ui/SignatureMark";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Meet Lulu — Texas-based photographer behind CapturedByLulu. Weddings, portraits, families, and events.",
  path: "/about",
  image: siteImages.about,
});

export default function AboutPage() {
  return (
    <div>
      <section className="px-6 pb-12 pt-28 lg:px-10 lg:pb-16 lg:pt-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-5">
            <p className="mb-5 text-[11px] tracking-[0.32em] uppercase text-primary">
              About CapturedByLulu
            </p>
            <h1 className="font-serif text-[clamp(2.75rem,6vw,4.5rem)] font-light leading-[1.05] text-foreground">
              Hi, I&apos;m Lulu
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-foreground/58">
              Texas-based photographer. Cinematic, editorial, and deeply
              personal — weddings, portraits, families, and events across Texas
              and beyond.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Book a Session</Button>
              <Button href="/portfolio" variant="outline">
                View Portfolio
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="relative lg:col-span-7">
            <div className="relative aspect-[5/4] overflow-hidden bg-card lg:aspect-[16/10]">
              <PhotoImage
                src={siteImages.about}
                alt="Family session by CapturedByLulu — client work"
                fill
                objectPosition={siteImageFraming.about.objectPosition}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-primary transition-colors hover:text-foreground"
            >
              <InstagramIcon size={14} />
              Follow {siteConfig.instagram}
              <ArrowRight size={12} />
            </a>
          </FadeIn>
        </div>
      </section>

      <AboutVisualStory />
      <SignatureMark />
      <AboutStoryChapters />

      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-base leading-relaxed text-foreground/58">
              When you book with CapturedByLulu, you work directly with me. Every
              inquiry is read personally, and every gallery is edited with the
              same care I&apos;d want for my own memories.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-primary"
            >
              Start a conversation
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
