import { siteConfig } from "@/data/site";
import type { BookingInquiry } from "@/lib/validation/booking";

function formatInquiryText(inquiry: BookingInquiry) {
  return [
    "New CapturedByLulu estimate / quote request",
    "",
    "This is not a confirmed booking. Reply to finalize details with the client.",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Session type: ${inquiry.sessionType}`,
    `Package / quote interest: ${inquiry.package}`,
    `Preferred date: ${inquiry.preferredDate}`,
    `Location: ${inquiry.location || "(not provided)"}`,
    "",
    "Message:",
    inquiry.message || "(none)",
  ].join("\n");
}

/** Sends estimate/quote request to the owner's inbox when Resend is configured. */
export async function sendInquiryNotification(
  inquiry: BookingInquiry,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  // Resend's test sender only delivers to the account's exact (lowercase) address.
  const to = (process.env.INQUIRY_EMAIL ?? siteConfig.email).trim().toLowerCase();
  const from =
    process.env.RESEND_FROM ?? "CapturedByLulu <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: inquiry.email,
      subject: `Estimate request — ${inquiry.name} (${inquiry.sessionType})`,
      text: formatInquiryText(inquiry),
    }),
  });

  if (!response.ok) {
    console.error(
      "[inquiry-notification] Resend rejected the email",
      response.status,
      await response.text().catch(() => ""),
    );
  }

  return response.ok;
}
