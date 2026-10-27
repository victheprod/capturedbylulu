import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "Capture Concierge",
  description:
    "Capture Concierge is temporarily archived. Request an estimate to get a custom quotation from Lulu.",
  path: "/concierge",
});

/** Concierge experience archived — keep route as a soft redirect landing. */
export default function ConciergePage() {
  return (
    <PageHeader
      className="pb-16 md:pb-24"
      eyebrow="Temporarily archived"
      tagline="Capture Concierge"
      title="This guide is paused for now."
      description="Request an estimate and Lulu will reply by email with a custom quote for your session or event."
      primaryCta={{ label: "Request an estimate", href: "/contact" }}
      secondaryCta={{ label: "View packages", href: "/services" }}
    />
  );
}
