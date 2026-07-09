"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useVision } from "@/components/vision/VisionContext";
import { LiveMoodBoard } from "@/components/vision/LiveMoodBoard";
import { StyleFilmStrip } from "@/components/vision/StyleFilmStrip";
import { VisionAtelierShell } from "@/components/vision/VisionAtelierShell";
import { VisionChoiceChip } from "@/components/vision/VisionChoiceChip";
import { VisionDock } from "@/components/vision/VisionDock";
import { VisionOrbitNav } from "@/components/vision/VisionOrbitNav";
import { VisionSummaryReveal } from "@/components/vision/VisionSummary";
import { buildMoodBoard } from "@/lib/vision/mood-board";
import { saveVisionToDatabase } from "@/lib/vision/persist";
import { buildVisionRecord } from "@/lib/vision/prefill";
import { recommendFromVision } from "@/lib/vision/recommend";
import {
  celebrationOptions,
  editingOptions,
  energyOptions,
  eraOptions,
  feelOptions,
  momentOptions,
  settingOptions,
  stepCopy,
  visionSteps,
} from "@/lib/vision/steps";
import { visionStyleCards } from "@/lib/vision/styles";
import type { VisionStepId } from "@/lib/vision/types";
import { Button } from "@/components/ui/Button";

const slideVariants = {
  enter: { opacity: 0, y: 32 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

function StepIntro({ step }: { step: VisionStepId }) {
  const copy = stepCopy[step];
  const stepNum = visionSteps.findIndex((s) => s.id === step) + 1;

  return (
    <header className="mb-8 max-w-xl">
      <p className="mb-3 font-serif text-5xl font-light leading-none text-foreground/12 sm:text-6xl">
        {String(stepNum).padStart(2, "0")}
      </p>
      <p className="mb-2 text-[10px] tracking-[0.32em] uppercase text-primary/90">
        {copy.eyebrow}
      </p>
      <h2 className="text-balance font-serif text-[clamp(1.65rem,3.5vw,2.35rem)] font-light leading-[1.14] text-foreground">
        {copy.title}
      </h2>
      {copy.description ? (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/48">
          {copy.description}
        </p>
      ) : null}
    </header>
  );
}

export function BuildYourVision() {
  const reduceMotion = useReducedMotion();
  const {
    stepId,
    answers,
    setAnswer,
    toggleStyle,
    toggleMoment,
    goNext,
    goBack,
    reset,
    canAdvance,
  } = useVision();

  const moodBoard = useMemo(() => buildMoodBoard(answers), [answers]);
  const recommendation = useMemo(
    () => (stepId === "result" ? recommendFromVision(answers) : null),
    [stepId, answers],
  );

  useEffect(() => {
    if (stepId === "result" && recommendation) {
      const record = buildVisionRecord(answers, recommendation);
      void saveVisionToDatabase(record);
    }
  }, [stepId, answers, recommendation]);

  const progressStep = Math.min(
    visionSteps.findIndex((s) => s.id === stepId) + 1,
    visionSteps.length,
  );

  const showBoard = stepId !== "welcome" && stepId !== "result";
  const activeStepMeta = visionSteps.find((s) => s.id === stepId);

  return (
    <div className="relative pb-28 lg:pb-8">
      {stepId === "welcome" ? (
        <WelcomeStep onBegin={goNext} previewImages={moodBoard} />
      ) : stepId === "result" && recommendation ? (
        <VisionSummaryReveal
          recommendation={recommendation}
          boardImages={moodBoard}
          onRestart={reset}
        />
      ) : (
        <div className="relative lg:grid lg:grid-cols-[minmax(0,11rem)_1fr] lg:gap-10 xl:gap-14">
          <VisionOrbitNav
            currentStep={progressStep}
            className="mb-6 lg:mb-0 lg:pt-8"
          />

          <div className="relative min-w-0">
            {showBoard ? (
              <div className="pointer-events-none absolute -right-2 -top-4 z-20 hidden w-[min(100%,300px)] lg:block xl:-right-8 xl:-top-8">
                <LiveMoodBoard images={moodBoard} className="pointer-events-auto shadow-2xl" />
              </div>
            ) : null}

            <VisionAtelierShell withBoard={showBoard} className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stepId}
                  variants={reduceMotion ? undefined : slideVariants}
                  initial={reduceMotion ? false : "enter"}
                  animate="center"
                  exit={reduceMotion ? undefined : "exit"}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {stepId === "styles" ? (
                    <>
                      <StepIntro step="styles" />
                      <StyleFilmStrip
                        cards={visionStyleCards}
                        selected={answers.styles}
                        onToggle={toggleStyle}
                      />
                    </>
                  ) : null}

                  {stepId === "celebration" ? (
                    <>
                      <StepIntro step="celebration" />
                      <div className="flex flex-wrap gap-2.5 sm:gap-3">
                        {celebrationOptions.map((opt, i) => (
                          <VisionChoiceChip
                            key={opt.value}
                            label={opt.label}
                            description={opt.description}
                            selected={answers.celebration === opt.value}
                            onClick={() => setAnswer("celebration", opt.value)}
                            index={i}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}

                  {stepId === "feel" ? (
                    <>
                      <StepIntro step="feel" />
                      <div className="flex flex-wrap gap-2.5 sm:gap-3">
                        {feelOptions.map((opt, i) => (
                          <VisionChoiceChip
                            key={opt.value}
                            label={opt.label}
                            selected={answers.feel === opt.value}
                            onClick={() => setAnswer("feel", opt.value)}
                            index={i}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}

                  {stepId === "moments" ? (
                    <>
                      <StepIntro step="moments" />
                      <div className="grid gap-3 sm:grid-cols-2">
                        {momentOptions.map((opt, i) => (
                          <VisionChoiceChip
                            key={opt.value}
                            label={opt.label}
                            description={opt.description}
                            selected={answers.moments.includes(opt.value)}
                            onClick={() => toggleMoment(opt.value)}
                            index={i}
                            layout="tile"
                            multi
                          />
                        ))}
                      </div>
                    </>
                  ) : null}

                  {stepId === "editing" ? (
                    <>
                      <StepIntro step="editing" />
                      <div className="flex flex-wrap gap-2.5 sm:gap-3">
                        {editingOptions.map((opt, i) => (
                          <VisionChoiceChip
                            key={opt.value}
                            label={opt.label}
                            selected={answers.editing === opt.value}
                            onClick={() => setAnswer("editing", opt.value)}
                            index={i}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}

                  {stepId === "setting" ? (
                    <>
                      <StepIntro step="setting" />
                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        {settingOptions.map((opt, i) => (
                          <VisionChoiceChip
                            key={opt.value}
                            label={opt.label}
                            description={opt.description}
                            selected={answers.setting === opt.value}
                            onClick={() => setAnswer("setting", opt.value)}
                            index={i}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}

                  {stepId === "energy" ? (
                    <>
                      <StepIntro step="energy" />
                      <div className="flex flex-wrap gap-2.5 sm:gap-3">
                        {energyOptions.map((opt, i) => (
                          <VisionChoiceChip
                            key={opt.value}
                            label={opt.label}
                            selected={answers.energy === opt.value}
                            onClick={() => setAnswer("energy", opt.value)}
                            index={i}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}

                  {stepId === "era" ? (
                    <>
                      <StepIntro step="era" />
                      <div className="flex flex-wrap gap-2.5 sm:gap-3">
                        {eraOptions.map((opt, i) => (
                          <VisionChoiceChip
                            key={opt.value}
                            label={opt.label}
                            selected={answers.era === opt.value}
                            onClick={() => setAnswer("era", opt.value)}
                            index={i}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </VisionAtelierShell>

            {showBoard ? (
              <div className="mt-6 lg:hidden">
                <LiveMoodBoard images={moodBoard} compact variant="strip" />
              </div>
            ) : null}
          </div>
        </div>
      )}

      {showBoard ? (
        <VisionDock
          stepLabel={activeStepMeta?.label ?? "Step"}
          canAdvance={canAdvance}
          onBack={goBack}
          onNext={goNext}
        />
      ) : null}
    </div>
  );
}

function WelcomeStep({
  onBegin,
  previewImages,
}: {
  onBegin: () => void;
  previewImages: ReturnType<typeof buildMoodBoard>;
}) {
  const copy = stepCopy.welcome;
  const reduceMotion = useReducedMotion();
  const previews = visionStyleCards.slice(0, 3);

  return (
    <div className="grid min-h-[min(72vh,640px)] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div className="max-w-xl">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] tracking-[0.36em] uppercase text-primary"
        >
          {copy.eyebrow}
        </motion.p>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.65 }}
          className="mt-5 font-serif text-[clamp(2.5rem,5.5vw,3.75rem)] font-light leading-[1.05] text-foreground"
        >
          {copy.title}
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-5 text-sm leading-relaxed text-foreground/52 sm:text-base"
        >
          {copy.description}
        </motion.p>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 border-l-2 border-primary/40 pl-4 text-sm italic text-foreground/45"
        >
          Choose the photos and styles that speak to you.
        </motion.p>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="mt-10"
        >
          <Button className="rounded-full px-10 py-4" onClick={onBegin}>
            Open the atelier
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
        <div className="vision-cork absolute inset-0 rounded-[2.5rem] rounded-tr-[4rem]" />
        <div className="relative flex h-full items-center justify-center p-8 sm:p-10">
          {previews.map((card, i) => {
            const offsets = [
              { x: -48, y: -24, rotate: -8, z: 1 },
              { x: 32, y: 8, rotate: 5, z: 3 },
              { x: -12, y: 56, rotate: -3, z: 2 },
            ];
            const o = offsets[i];
            return (
              <motion.div
                key={card.id}
                initial={reduceMotion ? false : { opacity: 0, y: 30, rotate: o.rotate - 10 }}
                animate={{ opacity: 1, y: 0, rotate: o.rotate }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                className="vision-polaroid absolute w-[38%] max-w-[140px] bg-[#f5f0e6] p-1.5 pb-4 shadow-xl"
                style={{ x: o.x, y: o.y, zIndex: o.z }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={card.src}
                    alt={card.label}
                    fill
                    sizes="140px"
                    className="object-cover"
                    style={{ objectPosition: card.objectPosition }}
                  />
                </div>
              </motion.div>
            );
          })}
          {previewImages.length === 0 ? (
            <p className="relative z-10 max-w-[180px] text-center text-xs leading-relaxed text-foreground/35">
              Your selections will pin here as you go.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
