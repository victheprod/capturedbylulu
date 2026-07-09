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
  { id: "vision", label: "Session" },
  { id: "review", label: "Review" },
];

const inputClass =
  "w-full border bg-card px-4 py-3.5 text-sm text-foreground placeholder-foreground/25 transition-colors duration-200 focus:border-primary focus:outline-none";

const labelClass =
  "mb-2 block text-[11px] tracking-[0.15em] uppercase text-foreground/45";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 flex items-start gap-1.5 text-xs text-red-400/90">
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
    if (searchParams.get("review") === "1") {
      setForm((current) => ({
        ...current,
        sessionType: current.sessionType || "Other / Not sure",
        message:
          current.message ||
          "I'd like to share a review from my session with Lulu:\n\n",
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
        sessionType && current.package.startsWith(`${sessionType} —`)
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
        preferredDate: "This date is not available for booking.",
      });
      setFormError("Please choose an available date.");
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
          "Your inquiry was received. Lulu will personally respond within 24–48 hours.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setFormError(
        "Unable to send your inquiry right now. Please try again or email Lulu directly.",
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
        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center border border-primary">
          <Check size={22} className="text-primary" />
        </div>
        <p className="mb-4 text-[11px] tracking-[0.25em] uppercase text-primary">
          Inquiry Received
        </p>
        <h2 className="mb-5 font-serif text-4xl font-light text-foreground lg:text-5xl">
          You&apos;re in good hands
        </h2>
        <p className="mb-10 leading-relaxed text-foreground/58">
          {successMessage}
        </p>

        <div className="border border-foreground/10 bg-card p-8 text-left">
          <p className="mb-7 text-[11px] tracking-[0.25em] uppercase text-primary">
            What Happens Next
          </p>
          <div className="space-y-6">
            {[
              {
                n: "1",
                t: "Personal response from Lulu",
                d: "Within 24–48 hours, you'll hear from Lulu directly with availability confirmation.",
              },
              {
                n: "2",
                t: "Discovery conversation",
                d: "You'll connect briefly to make sure the session is the perfect fit.",
              },
              {
                n: "3",
                t: "Proposal & contract",
                d: "You'll receive a custom proposal with package details and next steps.",
              },
              {
                n: "4",
                t: "Your date is held",
                d: "Once signed and the deposit is received, your date is officially reserved.",
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-primary/45">
                  <span className="text-[11px] text-primary">{item.n}</span>
                </div>
                <div>
                  <p className="mb-0.5 text-sm font-medium text-foreground">
                    {item.t}
                  </p>
                  <p className="text-xs text-foreground/48">{item.d}</p>
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
          className="flex items-start gap-3 border border-red-400/25 bg-red-950/20 px-4 py-3 text-sm text-red-200/90"
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
              <div className="border-b border-foreground/10 pb-8">
                <p className="text-[11px] tracking-[0.28em] uppercase text-primary">
                  Step one
                </p>
                <h3 className="mt-2 font-serif text-2xl font-light text-foreground lg:text-3xl">
                  Choose your experience
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/50">
                  Select the type of session you&apos;re dreaming of. Lulu will
                  help refine the details together.
                </p>
              </div>
              <div>
                <p className={labelClass}>Session Type</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {sessionTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSessionTypeChange(type)}
                      className={cn(
                        "border px-3 py-3 text-left text-xs tracking-wide transition-colors duration-300 sm:text-sm",
                        form.sessionType === type
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-foreground/12 text-foreground/65 hover:border-foreground/30",
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <FieldError message={fieldErrors.sessionType} />
              </div>

              {form.sessionType && (
                <div>
                  <p className={labelClass}>Select a Package</p>
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
                            className={cn(
                              "border p-4 text-left transition-colors duration-300",
                              selected
                                ? "border-primary bg-primary/10"
                                : "border-foreground/12 hover:border-foreground/30",
                            )}
                          >
                            <p
                              className={cn(
                                "text-sm font-medium",
                                selected ? "text-primary" : "text-foreground",
                              )}
                            >
                              {pkg.label}
                            </p>
                            <p className="mt-1 text-[10px] tracking-[0.12em] uppercase text-foreground/40">
                              {group.category}
                            </p>
                          </button>
                        );
                      }),
                    )}
                    {form.sessionType && (
                      <button
                        type="button"
                        onClick={() => updateField("package", NOT_SURE_PACKAGE)}
                        className={cn(
                          "border p-4 text-left transition-colors duration-300 sm:col-span-2",
                          form.package === NOT_SURE_PACKAGE
                            ? "border-primary bg-primary/10"
                            : "border-foreground/12 hover:border-foreground/30",
                        )}
                      >
                        <p
                          className={cn(
                            "text-sm font-medium",
                            form.package === NOT_SURE_PACKAGE
                              ? "text-primary"
                              : "text-foreground",
                          )}
                        >
                          {NOT_SURE_PACKAGE}
                        </p>
                        <p className="mt-1 text-xs text-foreground/45">
                          Lulu will help you find the perfect fit.
                        </p>
                      </button>
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
                description="Lulu reads every inquiry personally. Share how to reach you — you'll hear back within 24–48 hours."
              />
              <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={cn(
                      inputClass,
                      fieldErrors.name
                        ? "border-red-400/50"
                        : "border-foreground/12",
                    )}
                    placeholder="Your name"
                    aria-invalid={Boolean(fieldErrors.name)}
                  />
                  <FieldError message={fieldErrors.name} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-primary">*</span>
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
                        ? "border-red-400/50"
                        : "border-foreground/12",
                    )}
                    placeholder="your@email.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                  <FieldError message={fieldErrors.email} />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone <span className="text-primary">*</span>
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
                      ? "border-red-400/50"
                      : "border-foreground/12",
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
                title="Shape your session"
                description="Share your preferred date, location, and anything Lulu should know about your vision."
              />
              <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="preferredDate" className={labelClass}>
                    Preferred Date <span className="text-primary">*</span>
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
                      "[color-scheme:dark]",
                      fieldErrors.preferredDate
                        ? "border-red-400/50"
                        : "border-foreground/12",
                    )}
                    aria-invalid={Boolean(fieldErrors.preferredDate)}
                  />
                  <FieldError message={fieldErrors.preferredDate} />
                  {blockedDates.length > 0 && (
                    <p className="mt-2 text-xs text-foreground/40">
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
                    className={cn(inputClass, "border-foreground/12")}
                    placeholder="City / area in Texas"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>
                  Tell Lulu About Your Vision{" "}
                  <span className="text-primary">*</span>
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
                      ? "border-red-400/50"
                      : "border-foreground/12",
                  )}
                  placeholder="Share anything that feels important — your story, your vision, your must-have shots..."
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
                description="Everything look right? Send your inquiry — Lulu will respond personally within 24–48 hours."
              />
              <dl className="divide-y divide-foreground/10 border border-foreground/10 bg-card">
                {[
                  ["Session", form.sessionType],
                  ["Package", form.package],
                  ["Name", form.name],
                  ["Email", form.email],
                  ["Phone", form.phone],
                  ["Preferred Date", form.preferredDate],
                  ["Location", form.location || "Not specified"],
                  ["Vision", form.message],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[140px_1fr]"
                  >
                    <dt className="text-[10px] tracking-[0.15em] uppercase text-foreground/40">
                      {label}
                    </dt>
                    <dd className="text-sm text-foreground/80">{value}</dd>
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
            className="tracking-[0.18em]"
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
            className="tracking-[0.18em] sm:min-w-[160px]"
          >
            Continue
            <ArrowRight size={14} />
          </Button>
        ) : (
          <Button
            type="submit"
            className="tracking-[0.18em] sm:min-w-[160px]"
            isLoading={status === "loading"}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Sending
              </>
            ) : (
              "Send Inquiry"
            )}
          </Button>
        )}
      </div>

      <p className="text-center text-xs leading-relaxed text-foreground/35">
        {pricingNotes.deposit} Questions? Email{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-foreground/50 underline-offset-2 hover:text-primary hover:underline"
        >
          Lulu
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
