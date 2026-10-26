import Image from "next/image";
import Link from "next/link";
import { meetLuluPhoto } from "@/data/home";
import { siteConfig } from "@/data/site";
import { Label, delay } from "@/components/editorial/primitives";

export function MeetLulu() {
  return (
    <section aria-labelledby="lulu-title" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-40">
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-12">
        <div className="relative col-span-12 md:col-span-5">
          <div className="curtain" style={{ aspectRatio: `${meetLuluPhoto.width} / ${meetLuluPhoto.height}` }}>
            <Image
              src={meetLuluPhoto.src}
              alt={meetLuluPhoto.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: meetLuluPhoto.position }}
            />
          </div>
          <div className="reveal absolute -right-2 -bottom-6 bg-oxblood px-5 py-4 text-ivory md:-right-10" style={delay(300)}>
            <Label>The one behind the lens</Label>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <Label className="reveal block text-oxblood">Room Three / Meet Lulu</Label>
          <h2
            id="lulu-title"
            className="reveal mt-5 font-serif text-4xl leading-[1.04] font-light tracking-tight md:text-6xl"
            style={delay(100)}
          >
            &ldquo;I&rsquo;ll direct you when you need it and stay out of the way when you don&rsquo;t. Most of the
            good ones happen <em className="text-oxblood italic">in between.</em>&rdquo;
          </h2>
          <div className="reveal mt-10 grid gap-8 leading-relaxed text-ink-soft sm:grid-cols-2" style={delay(200)}>
            <p>
              I run CapturedByLulu out of Texas. I photograph weddings, portraits, families, and events here, and I
              travel when a shoot calls for it.
            </p>
            <p>
              When you work with CapturedByLulu, you work directly with me. Every gallery is edited with the same
              care I&rsquo;d want for my own memories.
            </p>
          </div>
          <div className="reveal mt-10 flex flex-wrap gap-x-8 gap-y-3" style={delay(300)}>
            <Link href="/about" className="link-line pb-1 font-medium">
              More about Lulu
            </Link>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line pb-1 font-medium"
            >
              {siteConfig.instagram}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
