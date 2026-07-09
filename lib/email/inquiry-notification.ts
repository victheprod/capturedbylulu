import { siteConfig } from "@/data/site";
import type { BookingInquiry } from "@/lib/validation/booking";

function formatInquiryText(inquiry: BookingInquiry) {
  return [
    "New CapturedByLulu inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Session type: ${inquiry.sessionType}`,
    `Package: ${inquiry.package}`,
    `Preferred date: ${inquiry.preferredDate}`,
    `Location: ${inquiry.location || "(not provided)"}`,
    "",
    "Message:",
    inquiry.message || "(none)",
  ].join("\n");
}

/** Sends inquiry to Lulu's inbox when Resend is configured. */
export async function sendInquiryNotification(
  inquiry: BookingInquiry,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.INQUIRY_EMAIL ?? siteConfig.email;
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
      subject: `New inquiry — ${inquiry.name} (${inquiry.sessionType})`,
      text: formatInquiryText(inquiry),
    }),
  });

  return response.ok;
}
