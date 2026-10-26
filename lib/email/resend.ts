import { siteConfig } from "@/data/site";

/** Sends a plain-text email to Lulu's inbox. Returns false when Resend is not configured or rejects it. */
export async function sendOwnerEmail({
  subject,
  text,
  replyTo,
  tag,
}: {
  subject: string;
  text: string;
  replyTo: string;
  /** Prefix for server logs. */
  tag: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  // Resend's test sender only delivers to the account's exact (lowercase) address.
  const to = (process.env.INQUIRY_EMAIL ?? siteConfig.email).trim().toLowerCase();
  const from = process.env.RESEND_FROM ?? "CapturedByLulu <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text }),
  });

  if (!response.ok) {
    console.error(
      `[${tag}] Resend rejected the email`,
      response.status,
      await response.text().catch(() => ""),
    );
  }

  return response.ok;
}
