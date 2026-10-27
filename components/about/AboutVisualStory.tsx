import { PhotoImage } from "@/components/ui/PhotoImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Label, delay } from "@/components/editorial/primitives";
import { siteImages, siteImageFraming } from "@/data/portfolio";

const visualChapters = [
  {
    src: siteImages.weddingsDetail1,
    objectPosition: siteImageFraming.weddingsDetail1.objectPosition,
    caption: "Weddings",
    line: "The quiet glance before the vows.",
  },
  {
    src: "/site-images/portraits/DSC08765.jpg",
    objectPosition: "50% 18%",
    caption: "Portraits",
    line: "Flattering light, without posing you into someone else.",
  },
  {
    src: "/site-images/families/IMG_3649.jpg",
    objectPosition: "50% 18%",
    caption: "Families",
    line: "Everyone looking like themselves.",
  },
];

export function AboutVisualStory() {
  return (
    <Section tone="surface" bordered>
      <SectionHeading
        eyebrow="The work"
        title="What I shoot most."
        action={
          <Button href="/portfolio" variant="link">
            Full portfolio
          </Button>
        }
      />
      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6 lg:gap-8">
        {visualChapters.map((chapter, i) => (
          <figure key={chapter.caption} className={i === 1 ? "md:mt-16" : undefined}>
            <div className="curtain relative aspect-[3/4] bg-bone" style={delay(i * 120)}>
              <PhotoImage
                src={chapter.src}
                alt={`${chapter.caption} photography by CapturedByLulu`}
                fill
                objectPosition={chapter.objectPosition}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <figcaption className="reveal mt-5" style={delay(i * 120 + 200)}>
              <Label className="text-oxblood">
                {String(i + 1).padStart(2, "0")} / {chapter.caption}
              </Label>
              <p className="mt-2 font-serif text-xl leading-snug font-light italic">{chapter.line}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
