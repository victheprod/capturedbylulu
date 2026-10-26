import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "link";

const base =
  "inline-flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary px-8 py-3.5 text-primary-foreground hover:bg-[#d4b87a]",
  outline:
    "border border-foreground/25 px-8 py-3.5 text-foreground/80 hover:border-primary hover:text-primary",
  ghost:
    "border border-foreground/20 px-8 py-3.5 text-foreground/60 hover:border-primary hover:text-primary",
  link: "group text-primary hover:text-foreground",
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
