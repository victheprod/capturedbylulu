import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type PhotoImageProps = ImageProps & {
  /** CSS object-position — defaults to centered framing */
  objectPosition?: string;
};

/**
 * Consistent photo framing: cover + center bias, with optional focal point.
 */
export function PhotoImage({
  className,
  objectPosition = "50% 50%",
  style,
  alt,
  ...props
}: PhotoImageProps) {
  return (
    <Image
      alt={alt}
      {...props}
      className={cn(
        "object-cover object-center",
        props.fill ? "h-full w-full" : "h-full w-full max-h-full max-w-full",
        className,
      )}
      style={{ objectPosition, ...style }}
    />
  );
}

/** Compute display height for a target width while preserving aspect ratio */
export function scaledPhotoHeight(
  width: number,
  height: number,
  targetWidth: number,
) {
  if (!width || !height) return targetWidth;
  return Math.max(1, Math.round((targetWidth * height) / width));
}
