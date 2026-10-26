import Link from "next/link";
import type { PublicTestimonial } from "@/lib/cms/testimonials";
import { homepageReviewNames } from "@/data/home";
import { Label, delay } from "@/components/editorial/primitives";
import { cn } from "@/lib/utils";

const supportingLayout = [
  "md:col-span-4",
  "md:col-span-3 md:col-start-6 md:mt-16",
  "md:col-span-3 md:col-start-10 md:mt-6",
];

function pickReviews(all: PublicTestimonial[]) {
  const curated = homepageReviewNames
    .map((name) => all.find((t) => t.name === name))
    .filter((t): t is PublicTestimonial => Boolean(t));
  return curated.length === homepageReviewNames.length ? curated : all.slice(0, 4);
}

export function GuestBook({ testimonials }: { testimonials: PublicTestimonial[] }) {
  const [lead, ...rest] = pickReviews(testimonials);
  if (!lead) return null;

  return (
    <section aria-labelledby="reviews-title" className="border-t border-ink/15 bg-bone/50 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="reveal flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/15 pb-5">
          <h2 id="reviews-title">
            <Label className="text-oxblood">Room Four / Guest book</Label>
          </h2>
          <Label className="text-ink-soft">In their words, unedited</Label>
        </div>

        <figure className="grid grid-cols-12 gap-x-6 pt-14 md:pt-20">
          <span className="col-span-1 hidden font-serif text-[9rem] leading-[0.7] text-oxblood lg:block" aria-hidden>
            &ldquo;
          </span>
          <blockquote className="reveal col-span-12 font-serif text-2xl leading-[1.3] font-light tracking-tight md:text-4xl lg:col-span-10">
            {lead.quote}
          </blockquote>
          <figcaption className="reveal col-span-12 mt-8 flex flex-wrap items-center gap-4 lg:col-span-10 lg:col-start-2">
            <span className="h-px w-12 bg-ink" />
            <span className="font-medium">{lead.name}</span>
            <Label className="text-ink-soft">{lead.type}</Label>
          </figcaption>
        </figure>

        <div className="mt-20 grid grid-cols-1 gap-y-14 md:mt-28 md:grid-cols-12 md:gap-x-6">
          {rest.map((review, i) => (
            <figure
              key={review.name}
              className={cn("reveal border-t border-ink pt-6", supportingLayout[i])}
              style={delay(i * 120)}
            >
              <blockquote className="font-serif text-xl leading-snug">&ldquo;{review.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 flex flex-col gap-1">
                <span className="font-medium">{review.name}</span>
                <Label className="text-ink-soft">{review.type}</Label>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="reveal mt-16 flex justify-end">
          <Link href="/contact?review=1" className="link-line pb-1 text-sm font-medium">
            Worked with Lulu? Leave a review
          </Link>
        </div>
      </div>
    </section>
  );
}
