import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Capture Concierge",
  description:
    "Capture Concierge is temporarily archived. Request an estimate to get a custom quotation from Lulu.",
  path: "/concierge",
});

/** Concierge experience archived — keep route as a soft redirect landing. */
export default function ConciergePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 text-[11px] tracking-[0.28em] uppercase text-primary">
        Temporarily archived
      </p>
      <h1 className="font-serif text-4xl font-light text-foreground lg:text-5xl">
        Capture Concierge
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/55">
        This guided package finder is paused for now. Request an estimate and
        Lulu will reply by email with a custom quotation for your session or
        event.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/contact">Get an estimate</Button>
        <Button href="/services" variant="outline">
          View packages
        </Button>
      </div>
      <Link
        href="/"
        className="mt-8 text-[11px] tracking-[0.18em] uppercase text-foreground/40 hover:text-primary"
      >
        Back home
      </Link>
    </div>
  );
}
