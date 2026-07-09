import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type TestimonialAuthor = {
  name: string;
  role?: string;
};

export type TestimonialCardProps = {
  author: TestimonialAuthor;
  text: string;
  stars?: number;
  href?: string;
  className?: string;
};

export function TestimonialCard({
  author,
  text,
  stars = 5,
  href,
  className,
}: TestimonialCardProps) {
  const Card = (
    <article
      className={cn(
        "glass-panel-subtle flex h-full w-[min(100vw-3rem,22rem)] shrink-0 flex-col p-7 sm:w-[24rem] sm:p-8",
        href && "transition-all duration-500 hover:border-primary/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} size={11} className="fill-primary text-primary" />
        ))}
      </div>
      <blockquote className="mb-6 flex-1 font-serif text-[1.05rem] leading-relaxed text-foreground italic">
        &ldquo;{text}&rdquo;
      </blockquote>
      <TestimonialAuthorBlock author={author} />
    </article>
  );

  if (href) {
    return (
      <a href={href} className="block shrink-0">
        {Card}
      </a>
    );
  }

  return Card;
}

export function TestimonialAuthorBlock({ author }: { author: TestimonialAuthor }) {
  return (
    <div>
      <p className="font-medium text-foreground">{author.name}</p>
      {author.role ? (
        <p className="mt-1 text-xs tracking-wide text-primary">{author.role}</p>
      ) : null}
    </div>
  );
}
