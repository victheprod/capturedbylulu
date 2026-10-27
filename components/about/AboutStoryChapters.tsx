import { PhotoImage } from "@/components/ui/PhotoImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Label, delay } from "@/components/editorial/primitives";
import { siteImages, siteImageFraming } from "@/data/portfolio";

const chapters = [
  {
    title: "I watch more than I pose",
    body: "Most of my favorite photos happen between the planned shots: a laugh, a look, someone fixing a collar.",
  },
  {
    title: "I direct when it helps",
    body: "If you're not sure what to do with your hands, I'll tell you. Nobody has to pretend to be a model.",
  },
  {
    title: "I get to know you first",
    body: "A quick conversation before the shoot makes the photos better. You'll be more relaxed, and I'll know what matters to you.",
  },
];

export function AboutStoryChapters() {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="curtain relative aspect-[3/4] bg-bone lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <PhotoImage
            src={siteImages.brandDetail}
            alt="Portrait photography by CapturedByLulu"
            fill
            objectPosition={siteImageFraming.brandDetail.objectPosition}
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading eyebrow="How I work" title="Three things I keep in mind." />
          <ol className="mt-14">
            {chapters.map((chapter, i) => (
              <li
                key={chapter.title}
                className="reveal grid grid-cols-[3rem_1fr] gap-x-4 border-t border-ink/15 py-8 md:grid-cols-[5rem_1fr]"
                style={delay(i * 100)}
              >
                <Label className="pt-2 text-oxblood">{String(i + 1).padStart(2, "0")}</Label>
                <div>
                  <h3 className="font-serif text-3xl leading-tight font-light">{chapter.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{chapter.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
