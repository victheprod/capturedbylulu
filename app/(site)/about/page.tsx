import type { Metadata } from "next";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { siteConfig } from "@/data/site";
import { siteImages, siteImageFraming } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Meet Lulu — San Antonio photographer behind CapturedByLulu. Weddings, portraits, families, and events.",
  path: "/about",
  image: siteImages.about,
});

const specialties = [
  "Wedding & Pre-Wedding Photography",
  "Portraits & Headshots",
  "Family Sessions",
  "Events & Celebrations",
  "Brand & Lifestyle Photography",
];

const philosophy = [
  {
    title: "Documentary at Heart",
    desc: "Real moments matter. I watch for the in-between — laughter, glances, and the details you will want to remember.",
  },
  {
    title: "Editorial in Eye",
    desc: "Every frame is composed with intention — light, color, and story working together.",
  },
  {
    title: "Relational in Practice",
    desc: "The best images come from trust. I take time to understand you before we ever pick up a camera.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 lg:pt-28">
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeIn className="lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] overflow-hidden bg-card">
              <PhotoImage
                src={siteImages.about}
                alt="Family session by CapturedByLulu — client work"
                width={800}
                height={1000}
                objectPosition={siteImageFraming.about.objectPosition}
              />
              <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-background/70 to-transparent px-4 py-3">
                <p className="text-[10px] tracking-[0.18em] uppercase text-foreground/80">
                  Client work · Family session
                </p>
              </div>
            </div>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 border border-foreground/10 bg-card px-4 py-3 text-sm text-foreground/65 transition-colors hover:border-primary/40 hover:text-primary"
            >
              <InstagramIcon size={14} />
              Follow {siteConfig.instagram}
            </a>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mb-4 text-[11px] tracking-[0.25em] uppercase text-primary">
              About CapturedByLulu
            </p>
            <h1 className="mb-9 font-serif text-5xl font-light leading-tight text-foreground lg:text-6xl">
              Hi, I&apos;m Lulu
            </h1>

            <div className="space-y-5 text-[0.95rem] leading-relaxed text-foreground/58">
              <p>
                I&apos;m a San Antonio photographer and the creator behind{" "}
                {siteConfig.name}. I photograph weddings, portraits, families,
                events, and brand sessions across San Antonio and surrounding
                areas — always with a cinematic, editorial approach.
              </p>
              <p>
                My goal is simple: create images that feel like you. Not stiff
                poses or generic stock moments — the real energy of your day,
                your family, or your brand. That might mean the quiet look
                between a couple before the ceremony, a belly laugh during a
                family session, or the confidence you bring to a headshot.
              </p>
              <p>
                When you book with CapturedByLulu, you work directly with me.
                Every inquiry is read personally, and every gallery is edited
                with the same care I&apos;d want for my own memories.
              </p>
              <p>
                The best way to see my latest work is on Instagram at{" "}
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary transition-colors hover:text-foreground"
                >
                  {siteConfig.instagram}
                </a>
                . When you&apos;re ready to plan a session, I&apos;d love to
                hear from you.
              </p>
            </div>

            <div className="mt-10 border-t border-foreground/10 pt-10">
              <p className="mb-5 text-[11px] tracking-[0.25em] uppercase text-primary">
                What I Photograph
              </p>
              <div className="flex flex-wrap gap-3">
                {specialties.map((item) => (
                  <span
                    key={item}
                    className="border border-foreground/12 px-4 py-2 text-[11px] tracking-[0.12em] uppercase text-foreground/45"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-foreground/10 pt-10">
              <p className="mb-6 text-[11px] tracking-[0.25em] uppercase text-primary">
                My Approach
              </p>
              <div className="space-y-5">
                {philosophy.map((val) => (
                  <div key={val.title} className="flex gap-4">
                    <div className="w-1 shrink-0 rounded-full bg-primary/50" />
                    <div>
                      <p className="mb-1 text-sm font-medium text-foreground">
                        {val.title}
                      </p>
                      <p className="text-sm text-foreground/55">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Book a Session</Button>
              <Button href="/portfolio" variant="outline">
                View Portfolio
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
