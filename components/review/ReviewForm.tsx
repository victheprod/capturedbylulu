"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, Star } from "lucide-react";
import { siteConfig } from "@/data/site";
import {
  REVIEW_MAX_LENGTH,
  REVIEW_SESSION_TYPES,
  type ReviewFieldErrors,
  type ReviewSubmission,
} from "@/lib/validation/review";
import { Label } from "@/components/editorial/primitives";
import { cn } from "@/lib/utils";

const initialForm: ReviewSubmission = {
  name: "",
  email: "",
  sessionType: "",
  rating: 0,
  review: "",
  allowPublish: false,
};

const fieldClass =
  "w-full border border-ink/20 bg-ivory px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-soft/60 transition-colors focus:border-ink focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-oxblood">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

export function ReviewForm() {
  const [form, setForm] = useState(initialForm);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<ReviewFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update = <K extends keyof ReviewSubmission>(key: K, value: ReviewSubmission[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setFormError(null);
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.success) {
        setStatus("sent");
        return;
      }
      setErrors(result.errors ?? {});
      setFormError(result.message ?? `Something went wrong. Please email your review to ${siteConfig.email}.`);
    } catch {
      setFormError(`We couldn't reach the server. Please try again or email ${siteConfig.email}.`);
    }
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-t border-ink pt-10">
        <Label className="text-oxblood">Received</Label>
        <p className="mt-4 font-serif text-4xl leading-tight font-light md:text-5xl">
          Thank you, {form.name.split(" ")[0]}.
        </p>
        <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
          Your review went straight to Lulu&rsquo;s inbox. He reads every one personally
          {form.allowPublish ? ", and may share yours on the site" : ""}.
        </p>
        <Link href="/" className="link-line mt-10 inline-flex items-center gap-2 pb-1 text-sm font-medium">
          Back to the homepage <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <fieldset aria-describedby={errors.rating ? "rating-error" : undefined}>
        <legend className="mb-3 text-sm font-medium">How was your experience?</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="cursor-pointer p-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-oxblood">
              <input
                type="radio"
                name="rating"
                value={value}
                checked={form.rating === value}
                onChange={() => update("rating", value)}
                className="sr-only"
              />
              <span className="sr-only">{value === 1 ? "1 star" : `${value} stars`}</span>
              <Star
                aria-hidden
                className={cn(
                  "h-8 w-8 transition-colors",
                  value <= form.rating ? "fill-oxblood text-oxblood" : "text-ink/25 hover:text-oxblood/60",
                )}
              />
            </label>
          ))}
        </div>
        <FieldError id="rating-error" message={errors.rating} />
      </fieldset>

      <div>
        <label htmlFor="review" className="mb-2 block text-sm font-medium">
          Your review
        </label>
        <textarea
          id="review"
          rows={6}
          maxLength={REVIEW_MAX_LENGTH}
          value={form.review}
          onChange={(e) => update("review", e.target.value)}
          placeholder="What was the shoot like? How did the photos turn out?"
          aria-invalid={Boolean(errors.review)}
          aria-describedby={errors.review ? "review-error" : undefined}
          className={cn(fieldClass, "resize-y", errors.review && "border-oxblood")}
        />
        <FieldError id="review-error" message={errors.review} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(fieldClass, errors.name && "border-oxblood")}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email <span className="font-normal text-ink-soft">(never shown)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldClass, errors.email && "border-oxblood")}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="sessionType" className="mb-2 block text-sm font-medium">
          Session <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <select
          id="sessionType"
          value={form.sessionType}
          onChange={(e) => update("sessionType", e.target.value)}
          className={cn(fieldClass, "appearance-none")}
        >
          <option value="">Choose one</option>
          {REVIEW_SESSION_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          checked={form.allowPublish}
          onChange={(e) => update("allowPublish", e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--color-oxblood)]"
        />
        Lulu may share this review on the website and Instagram with my first name.
      </label>

      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {formError && (
        <p role="alert" className="border-l-2 border-oxblood pl-4 text-sm text-oxblood">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-4 border border-ink bg-ink px-7 py-4 text-sm font-medium tracking-wide text-ivory transition-colors duration-500 hover:border-oxblood hover:bg-oxblood disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send review to Lulu"}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
