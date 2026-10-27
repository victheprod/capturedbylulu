"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { BookingPackageGroup } from "@/data/packages";
import {
  CUSTOM_QUOTE_PACKAGE,
  getBookingPackageGroups,
  getPackageBookingValue,
  getPackageEntryById,
  getSessionTypes,
  NOT_SURE_PACKAGE,
  pricingNotes,
} from "@/data/packages";
import { siteConfig } from "@/data/site";
import type { BookingFieldErrors } from "@/lib/validation/booking";
import {
  validateBookingInquiry,
  validateBookingStep,
} from "@/lib/validation/booking";
import { Button } from "@/components/ui/Button";
import { ProgressSteps, BookingStepIntro } from "@/components/ui/ProgressSteps";
import { cn } from "@/lib/utils";
import {
  clearConciergePrefill,
  loadConciergePrefill,
} from "@/lib/concierge/session";
import {
  clearVisionPrefill,
  loadVisionPrefill,
} from "@/lib/vision/session";

type FormState = {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  package: string;
  preferredDate: string;
  location: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  sessionType: "",
  package: "",
  preferredDate: "",
  location: "",
  message: "",
};

const BOOKING_STEPS = [
  { id: "experience", label: "Experience" },
  { id: "details", label: "Your Details" },
  { id: "vision", label: "Vision" },
  { id: "review", label: "Review" },
];

const inputClass =
  "w-full border bg-ivory px-4 py-3.5 text-base text-ink placeholder:text-ink/35 transition-colors duration-300 focus:border-ink focus:outline-none";

const labelClass = "font-label mb-2 block text-[10.5px] text-ink-soft";

const choiceClass = (selected: boolean) =>
  cn(
    "border text-left transition-colors duration-300",
    selected ? "border-ink bg-bone" : "border-ink/15 hover:border-ink/45",
  );

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 flex items-start gap-1.5 text-sm text-oxblood">
      <AlertCircle size={12} className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}

function BookingFormFields({
  packageGroups: propPackageGroups,
  blockedDates = [],
  initialPackage,
}: {
  packageGroups?: BookingPackageGroup[];
  blockedDates?: string[];
  initialPackage?: { sessionType: string; package: string };
}) {
  const searchParams = useSearchParams();
  const packageGroups = propPackageGroups ?? getBookingPackageGroups();
  const sessionTypes = useMemo(
    () => [
      ...(propPackageGroups?.map((g) => g.category) ?? getSessionTypes()),
      "Other / Not sure",
    ],
    [propPackageGroups],
  );

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<BookingFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const availablePackages = useMemo(() => {
    if (!form.sessionType || form.sessionType === "Other / Not sure") {
      return packageGroups;
    }
    return packageGroups.filter((group) => group.category === form.sessionType);
  }, [form.sessionType, packageGroups]);

  useEffect(() => {
    if (initialPackage) {
      setForm((current) => ({
        ...current,
        sessionType: initialPackage.sessionType,
        package: initialPackage.package,
      }));
      return;
    }
    if (searchParams.get("quote") === "custom") {
      setForm((current) => ({
        ...current,
        sessionType: current.sessionType || "Other / Not sure",
        package: CUSTOM_QUOTE_PACKAGE,
      }));
      return;
    }
    const fromConcierge = searchParams.get("from") === "concierge";
    const fromVision = searchParams.get("from") === "vision";
    const storedConciergePrefill = fromConcierge ? loadConciergePrefill() : null;
    const storedVisionPrefill = fromVision ? loadVisionPrefill() : null;
    const storedPrefill = storedVisionPrefill ?? storedConciergePrefill;
    const prefilledMessage =
      storedPrefill?.message ?? searchParams.get("message");
    const prefilledLocation =
      storedPrefill?.location ??
      searchParams.get("vision_setting") ??
      searchParams.get("concierge_location") ??
      searchParams.get("location");

    const packageId =
      storedPrefill?.packageId ?? searchParams.get("package");
    if (packageId) {
      const entry = getPackageEntryById(packageId);
      if (entry) {
        setForm((current) => ({
          ...current,
          sessionType: entry.category,
          package:
            storedPrefill?.package ??
            getPackageBookingValue(entry.category, entry.pkg),
          location: prefilledLocation || current.location,
          message:
            (fromConcierge || fromVision) && prefilledMessage
              ? prefilledMessage
              : current.message,
        }));
        if (storedConciergePrefill) clearConciergePrefill();
        if (storedVisionPrefill) clearVisionPrefill();
        return;
      }
    }

    if ((fromConcierge || fromVision) && (prefilledMessage || prefilledLocation)) {
      setForm((current) => ({
        ...current,
        location: prefilledLocation || current.location,
        message: prefilledMessage ? prefilledMessage : current.message,
      }));
      if (storedConciergePrefill) clearConciergePrefill();
      if (storedVisionPrefill) clearVisionPrefill();
    }
  }, [searchParams, initialPackage]);

  const isDateBlocked = (date: string) => blockedDates.includes(date);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
    setFormError(null);
  };

  const handleSessionTypeChange = (sessionType: string) => {
    setForm((current) => ({
      ...current,
      sessionType,
      package:
        current.package === CUSTOM_QUOTE_PACKAGE ||
        (sessionType && current.package.startsWith(`${sessionType} —`))
          ? current.package
          : "",
    }));
    setFieldErrors((current) => ({
      ...current,
      sessionType: undefined,
      package: undefined,
    }));
    setFormError(null);
  };

  const goNext = () => {
    if (step === 4) return;
    if (step === 3 && form.preferredDate && isDateBlocked(form.preferredDate)) {
      setFieldErrors({
        preferredDate: "This date is not available for an estimate request.",
      });
      setFormError(
        "Please choose another date, or ask for a custom quotation.",
      );
      return;
    }
    const validation = validateBookingStep(step, form);
    if (!validation.success) {
      setFieldErrors(validation.errors);
      setFormError(validation.message);
      return;
    }
    setFieldErrors({});
    setFormError(null);
    setStep((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setFieldErrors({});
    setFormError(null);
    setStep((current) => Math.max(1, current - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validation = validateBookingInquiry(form);
    if (!validation.success) {
      setFieldErrors(validation.errors);
      setFormError(validation.message);
      return;
    }

    setStatus("loading");
    setFieldErrors({});

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const payload = (await response.json()) as {
        success?: boolean;
        message?: string;
        errors?: BookingFieldErrors;
      };

      if (!response.ok || !payload.success) {
        setStatus("error");
        setFormError(
          payload.message ??
            "Something went wrong. Please try again or email Lulu directly.",
        );
        if (payload.errors) setFieldErrors(payload.errors);
        return;
      }

      setStatus("success");
      setSuccessMessage(
        payload.message ??
          "Your estimate request was sent to Lulu. This is not a booking. Lulu will reply by email with a quote and next steps.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setFormError(
        "Unable to send your estimate request right now. Please try again or email Lulu directly.",
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl text-center lg:max-w-none"
      >
        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center bg-ink text-ivory">
          <Check size={22} aria-hidden />
        </div>
        <p className="font-label mb-4 text-[10.5px] text-oxblood">Estimate request sent</p>
        <h2 className="mb-5 font-serif text-4xl font-light lg:text-5xl">
          Thank you. <em className="italic text-oxblood">Lulu has it.</em>
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-ink-soft">{successMessage}</p>

        <div className="border-t border-ink/15 pt-8 text-left">
          <p className="font-label mb-7 text-[10.5px] text-oxblood">What happens next</p>
          <div className="space-y-6">
            {[
              {
                n: "1",
                t: "Lulu reviews your request",
                d: "Your request lands in Lulu's inbox. Nothing is booked on the website.",
              },
              {
                n: "2",
                t: "A quote by email",
                d: "Usually within a day or two, you'll get a quote for your session or event.",
              },
              {
                n: "3",
                t: "Agree on the details",
                d: "Dates, coverage, and price are confirmed directly with Lulu by email.",
              },
              {
                n: "4",
                t: "Reserve when you're ready",
                d: "Your date is only held after you approve the quote and complete any retainer Lulu sends.",
              },
            ].map((item) => (
              <div key={item.n} className="grid grid-cols-[2.5rem_1fr] gap-x-3">
                <span className="font-label pt-1 text-[10.5px] text-oxblood">
                  {item.n.padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-xl">{item.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <ProgressSteps steps={BOOKING_STEPS} currentStep={step} />

      {formError && (
        <div
          role="alert"
          className="flex items-start gap-3 border border-oxblood/35 bg-oxblood/5 px-4 py-3 text-sm text-oxblood"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 1 && (
            <div className="space-y-8">
              <div className="border-b border-ink/15 pb-8">
                <p className="font-label text-[10.5px] text-oxblood">Step one</p>
                <h3 className="mt-3 font-serif text-3xl font-light lg:text-4xl">
                  What are we photographing?
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                  Pick the closest session and package. If it&apos;s something
                  else entirely, ask for a custom quote below.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    sessionType: current.sessionType || "Other / Not sure",
                    package: CUSTOM_QUOTE_PACKAGE,
                  }))
                }
                className={cn(
                  choiceClass(form.package === CUSTOM_QUOTE_PACKAGE),
                  "flex w-full items-center justify-between gap-4 px-5 py-4",
                )}
                aria-pressed={form.package === CUSTOM_QUOTE_PACKAGE}
              >
                <span>
                  <span className="block font-medium">Request a custom quote</span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    Corporate events, multi-day coverage, destination work, or
                    anything not on the price list.
                  </span>
                </span>
                {form.package === CUSTOM_QUOTE_PACKAGE ? (
                  <Check size={16} className="shrink-0 text-oxblood" aria-hidden />
                ) : (
                  <ArrowRight size={16} className="shrink-0 text-ink/40" aria-hidden />
                )}
              </button>
              <div>
                <p className={labelClass}>Session Type</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {sessionTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSessionTypeChange(type)}
                      className={cn(choiceClass(form.sessionType === type), "px-3 py-3 text-sm")}
                      aria-pressed={form.sessionType === type}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <FieldError message={fieldErrors.sessionType} />
              </div>

              {form.sessionType && (
                <div>
                  <p className={labelClass}>Package or custom quotation</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {availablePackages.flatMap((group) =>
                      group.packages.map((pkg) => {
                        const value = `${group.category} — ${pkg.label}`;
                        const selected = form.package === value;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => updateField("package", value)}
                            className={cn(choiceClass(selected), "p-4")}
                            aria-pressed={selected}
                          >
                            <p className="font-medium">{pkg.label}</p>
                            <p className="font-label mt-1 text-[10px] text-ink-soft">
                              {group.category} · Estimate
                            </p>
                          </button>
                        );
                      }),
                    )}
                    {form.sessionType && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            updateField("package", CUSTOM_QUOTE_PACKAGE)
                          }
                          className={cn(
                            choiceClass(form.package === CUSTOM_QUOTE_PACKAGE),
                            "p-4 sm:col-span-2",
                          )}
                          aria-pressed={form.package === CUSTOM_QUOTE_PACKAGE}
                        >
                          <p className="font-medium">{CUSTOM_QUOTE_PACKAGE}</p>
                          <p className="mt-1 text-sm text-ink-soft">
                            Weddings, corporate events, multi-day coverage, or
                            anything outside the listed packages. Lulu will
                            quote it by email.
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateField("package", NOT_SURE_PACKAGE)
                          }
                          className={cn(
                            choiceClass(form.package === NOT_SURE_PACKAGE),
                            "p-4 sm:col-span-2",
                          )}
                          aria-pressed={form.package === NOT_SURE_PACKAGE}
                        >
                          <p className="font-medium">{NOT_SURE_PACKAGE}</p>
                          <p className="mt-1 text-sm text-ink-soft">
                            Lulu will help you pick the right one.
                          </p>
                        </button>
                      </>
                    )}
                  </div>
                  <FieldError message={fieldErrors.package} />
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <BookingStepIntro
                step="Step two"
                title="A little about you"
                description="Your estimate goes straight to Lulu's email. Share how to reach you. You'll usually hear back within a day or two."
              />
              <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name <span className="text-oxblood">*</span>
                  </label>
                  <input
                    id="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={cn(
                      inputClass,
                      fieldErrors.name
                        ? "border-oxblood"
                        : "border-ink/20",
                    )}
                    placeholder="Your name"
                    aria-invalid={Boolean(fieldErrors.name)}
                  />
                  <FieldError message={fieldErrors.name} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-oxblood">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={cn(
                      inputClass,
                      fieldErrors.email
                        ? "border-oxblood"
                        : "border-ink/20",
                    )}
                    placeholder="your@email.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                  <FieldError message={fieldErrors.email} />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone <span className="text-oxblood">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={cn(
                    inputClass,
                    fieldErrors.phone
                      ? "border-oxblood"
                      : "border-ink/20",
                  )}
                  placeholder="(346) 000-0000"
                  aria-invalid={Boolean(fieldErrors.phone)}
                />
                <FieldError message={fieldErrors.phone} />
              </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <BookingStepIntro
                step="Step three"
                title="Shape your estimate"
                description="Share a preferred date, location, and anything Lulu should know, especially for custom event quotes."
              />
              <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="preferredDate" className={labelClass}>
                    Preferred Date <span className="text-oxblood">*</span>
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) =>
                      updateField("preferredDate", e.target.value)
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className={cn(
                      inputClass,
                      "[color-scheme:light]",
                      fieldErrors.preferredDate
                        ? "border-oxblood"
                        : "border-ink/20",
                    )}
                    aria-invalid={Boolean(fieldErrors.preferredDate)}
                  />
                  <FieldError message={fieldErrors.preferredDate} />
                  {blockedDates.length > 0 && (
                    <p className="mt-2 text-sm text-ink-soft">
                      Some dates may be unavailable. Blocked dates cannot be selected.
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="location" className={labelClass}>
                    Location / Venue
                  </label>
                  <input
                    id="location"
                    value={form.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    className={cn(inputClass, "border-ink/20")}
                    placeholder="City / area in Texas"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>
                  Tell Lulu About Your Vision{" "}
                  <span className="text-oxblood">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={cn(
                    inputClass,
                    "resize-none",
                    fieldErrors.message
                      ? "border-oxblood"
                      : "border-ink/20",
                  )}
                  placeholder={
                    form.package === CUSTOM_QUOTE_PACKAGE
                      ? "Describe the event or custom coverage you need: timeline, guest count, must-have moments, budget range..."
                      : "Share anything that feels important: your story, your vision, your must-have shots..."
                  }
                  aria-invalid={Boolean(fieldErrors.message)}
                />
                <FieldError message={fieldErrors.message} />
              </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <BookingStepIntro
                step="Step four"
                title="One last look"
                description="This sends an estimate request to Lulu's email. It isn't a booking; Lulu will reply with a quote to finalize."
              />
              <dl className="divide-y divide-ink/12 border-y border-ink/15">
                {[
                  ["Session", form.sessionType],
                  ["Estimate for", form.package],
                  ["Name", form.name],
                  ["Email", form.email],
                  ["Phone", form.phone],
                  ["Preferred Date", form.preferredDate],
                  ["Location", form.location || "Not specified"],
                  ["Vision", form.message],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[150px_1fr]"
                  >
                    <dt className="font-label pt-0.5 text-[10px] text-ink-soft">
                      {label}
                    </dt>
                    <dd className="break-words text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            
          >
            <ArrowLeft size={14} />
            Back
          </Button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {step < 4 ? (
          <Button
            type="button"
            onClick={goNext}
            className="sm:min-w-[170px]"
          >
            Continue
            <ArrowRight size={14} />
          </Button>
        ) : (
          <Button
            type="submit"
            className="sm:min-w-[170px]"
            isLoading={status === "loading"}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Sending
              </>
            ) : (
              "Send estimate request"
            )}
          </Button>
        )}
      </div>

      <p className="text-center text-sm leading-relaxed text-ink-soft">
        {pricingNotes.deposit} Questions? Email{" "}
        <a
          href={`mailto:${siteConfig.email.toLowerCase()}`}
          className="text-ink underline decoration-oxblood/50 underline-offset-4 hover:text-oxblood"
        >
          {siteConfig.email}
        </a>
        .
      </p>
    </form>
  );
}

function BookingFormFallback() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="mb-8 flex justify-between">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-8 bg-card" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="h-[72px] bg-card" />
        <div className="h-[72px] bg-card" />
      </div>
      <div className="h-12 bg-card" />
    </div>
  );
}

export function BookingForm({
  packageGroups,
  blockedDates,
  initialPackage,
}: {
  packageGroups?: BookingPackageGroup[];
  blockedDates?: string[];
  initialPackage?: { sessionType: string; package: string };
} = {}) {
  return (
    <Suspense fallback={<BookingFormFallback />}>
      <BookingFormFields
        packageGroups={packageGroups}
        blockedDates={blockedDates}
        initialPackage={initialPackage}
      />
    </Suspense>
  );
}
