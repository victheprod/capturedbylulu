import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-[#d4b87a]",
  outline: "border border-foreground/35 text-foreground hover:border-foreground/70",
  ghost: "border border-foreground/20 text-foreground/60 hover:border-primary hover:text-primary",
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
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 px-9 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300",
    variants[variant],
    fullWidth && "w-full",
    (disabled || isLoading) && "pointer-events-none opacity-60",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {children}
    </button>
  );
}
