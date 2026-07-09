"use client";

import { motion } from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { siteBranding } from "@/data/site";
import { siteImages } from "@/data/portfolio";
import { framingForSrc } from "@/lib/photo-framing";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type HeroGeometricProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  imageSrc?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-primary/[0.14]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -120,
        rotate: rotate - 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate,
      }}
      transition={{
        duration: 2.2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.1 },
      }}
      className={cn("pointer-events-none absolute", className)}
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border border-primary/20 backdrop-blur-[1px]",
            "shadow-[0_8px_40px_0_rgba(200,169,106,0.08)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(200,169,106,0.15),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.35 + i * 0.15,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

export function HeroGeometric({
  eyebrow = siteBranding.eyebrow,
  title,
  subtitle,
  imageSrc = siteImages.hero,
  primaryCta,
  secondaryCta,
}: HeroGeometricProps) {
  const framing = framingForSrc(imageSrc);

  return (
    <section className="relative flex min-h-screen min-h-[640px] items-end overflow-hidden bg-background">
      {/* Photography */}
      <div className="absolute inset-0">
        <PhotoImage
          src={imageSrc}
          alt="CapturedByLulu — Texas-based luxury photography"
          fill
          priority
          objectPosition={framing.objectPosition}
          className="opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.25}
          width={520}
          height={120}
          rotate={10}
          gradient="from-primary/[0.18]"
          className="top-[18%] left-[-8%] md:top-[22%] md:left-[-4%]"
        />
        <ElegantShape
          delay={0.45}
          width={420}
          height={100}
          rotate={-14}
          gradient="from-foreground/[0.07]"
          className="top-[68%] right-[-6%] md:top-[72%] md:right-[0%]"
        />
        <ElegantShape
          delay={0.35}
          width={260}
          height={72}
          rotate={-6}
          gradient="from-primary/[0.12]"
          className="bottom-[8%] left-[6%] md:bottom-[12%] md:left-[10%]"
        />
        <ElegantShape
          delay={0.55}
          width={180}
          height={52}
          rotate={18}
          gradient="from-primary/[0.1]"
          className="top-[12%] right-[12%] hidden md:block md:top-[14%] md:right-[18%]"
        />
        <ElegantShape
          delay={0.65}
          width={120}
          height={36}
          rotate={-20}
          gradient="from-foreground/[0.05]"
          className="top-[8%] left-[22%] hidden lg:block"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="max-w-3xl">
          {eyebrow && (
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-6 inline-flex items-center gap-2.5 border border-primary/25 bg-background/30 px-4 py-1.5 backdrop-blur-sm md:mb-8"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-primary">
                {eyebrow}
              </span>
            </motion.div>
          )}

          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-7 font-serif text-[clamp(2.75rem,7.5vw,5.25rem)] font-light leading-[1.05] text-foreground"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-9 max-w-lg text-base leading-relaxed text-foreground/65 lg:text-lg"
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4 sm:flex-row"
            >
              {primaryCta && (
                <Button href={primaryCta.href}>{primaryCta.label}</Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outline">
                  {secondaryCta.label}
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute right-8 bottom-8 z-10 hidden flex-col items-center gap-3 lg:right-12 lg:flex">
        <div className="h-12 w-px bg-foreground/25" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40"
        aria-hidden
      />
    </section>
  );
}

export { ElegantShape };
