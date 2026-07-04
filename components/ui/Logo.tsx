import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
};

const sizes = {
  sm: { className: "h-9 w-9", width: 36, height: 36 },
  md: { className: "h-11 w-11 sm:h-12 sm:w-12", width: 48, height: 48 },
  lg: { className: "h-16 w-16 sm:h-20 sm:w-20", width: 80, height: 80 },
};

export function Logo({ className, size = "md", href = "/" }: LogoProps) {
  const { className: sizeClass, width, height } = sizes[size];

  const image = (
    <Image
      src="/logo.png"
      alt={siteConfig.name}
      width={width}
      height={height}
      className={cn(sizeClass, "object-contain", className)}
      priority={size !== "sm"}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 transition-opacity duration-300 hover:opacity-85"
      aria-label={`${siteConfig.name} home`}
    >
      {image}
    </Link>
  );
}
