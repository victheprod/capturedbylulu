import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl font-light leading-tight text-foreground lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-lg text-base leading-relaxed text-foreground/58",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif text-5xl font-light text-foreground lg:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-lg leading-relaxed text-foreground/58">
          {description}
        </p>
      )}
    </div>
  );
}
