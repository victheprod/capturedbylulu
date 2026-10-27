import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "link";

const base =
  "inline-flex items-center justify-center gap-3 text-sm font-medium tracking-wide transition-colors duration-500";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-primary bg-primary px-7 py-4 text-primary-foreground hover:border-oxblood hover:bg-oxblood hover:text-ivory",
  outline:
    "border border-foreground/30 px-7 py-4 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
  ghost:
    "border border-foreground/15 px-7 py-4 text-foreground/70 hover:border-foreground/40 hover:text-foreground",
  link: "group text-foreground underline decoration-oxblood/60 underline-offset-[6px] hover:text-oxblood",
};

type ButtonProps = {
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  external?: boolean;
  arrow?: boolean;
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  type = "button",
  onClick,
  fullWidth,
  disabled,
  isLoading,
  external,
  arrow = variant === "link",
}: ButtonProps) {
  const styles = cn(
    base,
    variants[variant],
    fullWidth && "w-full",
    (disabled || isLoading) && "pointer-events-none opacity-60",
    className,
  );

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={13}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(styles, "group")}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cn(styles, "group")} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(styles, "group")}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {content}
    </button>
  );
}
