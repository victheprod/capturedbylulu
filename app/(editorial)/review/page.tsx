import type { Metadata } from "next";
import Image from "next/image";
import { ReviewForm } from "@/components/review/ReviewForm";
import { Label, delay } from "@/components/editorial/primitives";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Leave a Review",
  description: "Worked with Lulu? Share how your session went. Every review goes straight to Lulu.",
  path: "/review",
});

export default function ReviewPage() {
  return (
    <section aria-labelledby="review-title" className="pt-16 md:pt-20">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="hero-rise flex items-center justify-between border-b border-ink/15 pt-8 pb-4 md:pt-12">
          <Label className="text-oxblood">Guest book / Leave a review</Label>
          <Label className="hidden text-ink-soft sm:inline">Read personally by Lulu</Label>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-14 py-14 md:py-20">
          <div className="col-span-12 lg:col-span-5">
            <h1
              id="review-title"
              className="hero-rise font-serif text-6xl leading-[0.92] font-light tracking-[-0.03em] md:text-8xl"
              style={delay(120)}
            >
              How did we <em className="text-oxblood italic">do?</em>
            </h1>
            <p className="hero-rise mt-8 max-w-md text-lg leading-relaxed text-ink-soft" style={delay(260)}>
              If Lulu photographed your wedding, portraits, family or event, he&rsquo;d love to hear how it went. A
              few honest sentences are perfect.
            </p>
            <figure className="hero-rise mt-12 hidden max-w-sm lg:block" style={delay(380)}>
              <div className="relative aspect-[933/1400] overflow-hidden">
                <Image
                  src="/site-images/weddings/DSC07789.jpg"
                  alt="A smiling bride in red satin pajamas sits on a bed with balloons behind her."
                  fill
                  sizes="24rem"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-serif text-base italic">Before the ceremony</figcaption>
            </figure>
          </div>

          <div className="hero-rise col-span-12 lg:col-span-6 lg:col-start-7" style={delay(300)}>
            <ReviewForm />
          </div>
        </div>
      </div>
    </section>
  );
}
